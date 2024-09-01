import { Injectable, Dependencies, UnauthorizedException, NotAcceptableException, HttpStatus, NotFoundException, Inject } from '@nestjs/common';
import * as argon2 from 'argon2';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { ApiResponse } from 'src/utils/ApiResponse';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
    ) {}

    async validateUser(loginUserDto:LoginUserDto) {
        const existingUser = await this.userService.findByEmail(loginUserDto.email);
        if (!existingUser) throw new NotAcceptableException('Invalid email or password');

        const { password, ...user } = existingUser;

        const isValidPassword = await argon2.verify(password, loginUserDto.password);
        if (!isValidPassword) throw new NotAcceptableException('Invalid email or password');

        // return user;
        const {accessToken, refreshToken} = await this.generateToken({sub: user.id});
        const hashedRefreshToken = await argon2.hash(refreshToken);
    
        await this.userService.updateRefreshToken(user.id, hashedRefreshToken);
    
        return ApiResponse(200, 'Login successful', { user, accessToken, refreshToken });
    }

    async refreshToken(userId: number) {
      const {accessToken, refreshToken} = await this.generateToken({sub: userId});
      const hashedRefreshToken = await argon2.hash(refreshToken);
      
      await this.userService.updateRefreshToken(userId, hashedRefreshToken);
      
      return ApiResponse(200, 'Refresh token successful', { accessToken, refreshToken });
    }
  
    async generateToken(payload: any) {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.sign(payload),
        this.jwtService.sign(payload, this.refreshTokenConfig),
      ])
      return { accessToken, refreshToken }
    }


    async validateRefreshToken(userId: number, refreshToken: string) {
      
      const user = await this.userService.findOne(userId);
      
      if (!user) throw new NotFoundException('User is not found!');
      if (!user.refreshToken) throw new NotFoundException('Invalid Refresh Token!');
      const isRefreshTokenMatch = await argon2.verify(user.refreshToken, refreshToken);
  
      if (!isRefreshTokenMatch) throw new UnauthorizedException('Refresh token is not valid!');
  
      return user;
    }
  
    async validateJwtUser(userId: number) {
      const user = await this.userService.findOne(userId);
      if (!user) throw new UnauthorizedException('User not found!');
      if(!user.refreshToken) throw new UnauthorizedException();
      const currentUser = { id: user.id, roles: user.roles };
      return currentUser;
    }
  
    async logout(userId: number) {
      const existingUser = await this.userService.findOne(userId);
      if (!existingUser) throw new NotFoundException('User not found');
      await this.userService.updateRefreshToken(userId, null);
      return ApiResponse(200, 'Logout successful', );
    }
}