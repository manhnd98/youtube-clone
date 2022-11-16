import {ConfigType, registerAs} from "@nestjs/config";
import {Inject} from "@nestjs/common";

export const authConfig = registerAs('auth', () => ({
  jwtRefreshTokenSecret: process.env.JWT_RT_SECRET || 'rt_secret',
  jwtRefreshTokenExpired: process.env.JWT_RT_EXPIRED || 60 * 60 * 24 * 7, // A week
  jwtAccessTokenExpired: process.env.JWT_AT_EXPIRED || 60 * 15, // 15 min
  jwtAccessTokenSecret: process.env.JWT_AT_SECRET || 'at_secret',
  jwtSalt: process.env.JWT_SALT || 12
}));

export type AuthConfig = ConfigType<typeof authConfig>;

export const InjectAuthConfig = () => Inject(authConfig.KEY);