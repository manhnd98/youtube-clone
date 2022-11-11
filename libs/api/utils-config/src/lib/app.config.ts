import {ConfigType, registerAs} from "@nestjs/config";
import {Inject} from "@nestjs/common";

export const appConfig = registerAs('app', () => ({
  host: process.env.APP_HOST || 'localhost',
  port: process.env.APP_PORT || '3333',
  scheme: process.env.APP_SCHEME || 'http',

  get domain() {
    return `${this.scheme}://${this.host}:${this.port}`;
  }
}))


export type AppConfig = ConfigType<typeof appConfig>;

export const InjectAppConfig = () => Inject(appConfig.KEY);
