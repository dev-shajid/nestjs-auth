// import { PassportStrategy } from "@nestjs/passport";
// import { AuthService } from "../auth.service";
// import { Inject, Injectable } from "@nestjs/common";
// import { ConfigType } from "@nestjs/config";
// import jwtConfig from "../config/jwt.config";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import refreshJwtConfig from "../config/refresh-jwt.config";
// import { Request } from "express";

// @Injectable()
// export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
//   constructor(
//     @Inject(refreshJwtConfig.KEY) private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
//     private authService: AuthService,
//   ) {
//     super({
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         secretOrKey: refreshJwtConfiguration.secret,
//         ignoreExpiration: false,
//         passReqToCallback: true,
//     });
//   }

//   async validate(req:Request, payload: any) {
//     const refreshToken = req.headers.authorization.replace('Bearer ', '');
//     const userId = payload.sub;
//     const isValidRefreshToken = await this.authService.validateRefreshToken(userId, refreshToken);
//     if (!isValidRefreshToken) return false;
//     return {id: payload.sub}
//   }
// }