import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Inject, Injectable} from "@nestjs/common";
import {AuthConfig, authConfig} from "@youtube-clone/api/utils-config";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(authConfig.KEY) private config: AuthConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtAccessTokenSecret
    });
  }

  validate(payload: unknown) {
    return payload;
  }

}