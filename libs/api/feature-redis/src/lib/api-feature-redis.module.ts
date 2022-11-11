import {CacheModule, CacheStore, Logger, Module} from '@nestjs/common';
import {ApiFeatureConfigModule} from "@youtube-clone/api/feature-config";
import {redisStore} from 'cache-manager-redis-store';
import {RedisConfig, redisConfig} from "@youtube-clone/api/utils-config";

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [redisConfig.KEY],
      useFactory: async (redisConfig: RedisConfig) => {
        const store = await redisStore({
          socket: {
            host: redisConfig.host,
            port: Number(redisConfig.port)
          },
          password: redisConfig.password
        });

        return {
          store: store as unknown as CacheStore,
          ttl: Number(redisConfig.ttl)
        }
      }
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiFeatureRedisModule {
}
