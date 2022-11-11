import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {appConfig, authConfig, dbConfig, redisConfig} from "@youtube-clone/api/utils-config";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig, authConfig, dbConfig, redisConfig]
  })],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiFeatureConfigModule {
}
