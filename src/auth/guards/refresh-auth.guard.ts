import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { AuthService } from '../auth.service';
  
  @Injectable()
  export class RefreshAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
  
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.REFRESH_JWT_SECRET,
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        if(!payload || !payload?.sub) throw new UnauthorizedException();
        const isValidRefreshToken = await this.authService.validateRefreshToken(payload.sub, token);
        if (!isValidRefreshToken) return false;
        
        request['user'] = { id: payload.sub };
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  