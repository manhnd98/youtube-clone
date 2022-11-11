import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MonitorModule} from '@youtube-clone/monitor';
import {HttpModule} from '@nestjs/axios';
import {ApiFeatureConfigModule} from '@youtube-clone/api/feature-config';
import {ApiFeatureAuthModule} from "@youtube-clone/api/feature-auth";

@Module({
    imports: [
        MonitorModule,
        HttpModule,
        ApiFeatureConfigModule,
        ApiFeatureAuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
