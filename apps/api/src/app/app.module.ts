import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MonitorModule} from '@youtube-clone/monitor';
import {HttpModule} from '@nestjs/axios';
import {ApiFeatureConfigModule} from '@youtube-clone/api/feature-config';
import {LoggerMiddleware} from '@youtube-clone/shared-core';

@Module({
    imports: [MonitorModule, HttpModule, ApiFeatureConfigModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // apply middleware
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
