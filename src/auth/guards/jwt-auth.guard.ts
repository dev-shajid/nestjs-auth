// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { AuthGuard } from '@nestjs/passport';
// import { Observable } from 'rxjs';
// import { IS_PUBLICK_KEY } from 'src/auth/decorators/public.decorator';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt'){
//     constructor(private reflector: Reflector) {super()}
//     canActivate(
//       context: ExecutionContext,
//     ): boolean | Promise<boolean> | Observable<boolean> { 
//       const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLICK_KEY, [
//         context.getHandler(),
//         context.getClass(),
//       ]);
      
//       if(isPublic) return true;
//       return super.canActivate(context);
//     }
// }
