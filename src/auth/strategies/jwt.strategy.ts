// import { PassportStrategy } from "@nestjs/passport";
// import { AuthService } from "../auth.service";
// import { Inject, Injectable } from "@nestjs/common";
// import { ConfigType } from "@nestjs/config";
// import jwtConfig from "../config/jwt.config";
// import { ExtractJwt, Strategy } from "passport-jwt";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @Inject(jwtConfig.KEY) private jwtConfiguration: ConfigType<typeof jwtConfig>,
//     private authService: AuthService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: jwtConfiguration.secret,
//       ignoreExpiration: false,
//     });
//   }

//   async validate(payload: any) {
//     return this.authService.validateJwtUser(payload.id);
//   }
// }