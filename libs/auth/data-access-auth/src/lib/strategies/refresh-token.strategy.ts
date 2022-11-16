import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Inject, Injectable} from "@nestjs/common";
import {AuthConfig, authConfig} from "@youtube-clone/api/utils-config";
import {Request} from "@youtube-clone/shared-core";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

  constructor(@Inject(authConfig.KEY) private config: AuthConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtRefreshTokenSecret,
      passReqToCallback: true
    });
  }

  validate(request: Request, payload: unknown) {
    const refreshToken = request.get('authorization').replace('Bearer', '').trim();
    return {
      ...payload as object,
      refreshToken
    };
  }

}