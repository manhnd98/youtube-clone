import {ConfigType, registerAs} from "@nestjs/config";
import {Inject} from "@nestjs/common";

export const redisConfig = registerAs("redis", () => ({

  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || '6379',
  password: process.env.REDIS_PASSWORD || 'helloworld',
  ttl: process.env.REDIS_TTL || 60
}))

export type RedisConfig = ConfigType<typeof redisConfig>;

export const InjectRedisConfig = () => Inject(redisConfig.KEY)