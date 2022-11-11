import {ConfigType, registerAs} from "@nestjs/config";
import {Inject} from "@nestjs/common";

export const authConfig = registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET || 'helloworld',
  jwtExpired: process.env.JWT_EXPIRED || '7d',
  jwtSalt: process.env.JWT_SALT || 12
}));

export type AuthConfig = ConfigType<typeof authConfig>;

export const InjectAuthConfig = () => Inject(authConfig.KEY);