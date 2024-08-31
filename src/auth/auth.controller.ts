import { Body, Controller, HttpCode, HttpStatus, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    console.log(req.user);
    return req.user;
  }
  
  @Post('logout')
  async logout(@Request() req) {
    if(!req.user.id) throw new UnauthorizedException('Invalid user');
    return this.authService.logout(req.user.id)
  }
}