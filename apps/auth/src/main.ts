/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';

async function bootstrap() {
    const SERVICE_NAME = 'TENANT';

    const app = await NestFactory.create(AppModule);

    const microservice = app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: 5001,
        },
    });

    await app.startAllMicroservices();
    await app.listen(3001);

    Logger.log(`🚀 ${SERVICE_NAME} is running`, SERVICE_NAME);
}

bootstrap();
