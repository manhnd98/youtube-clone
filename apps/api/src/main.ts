/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import * as compression from 'compression';
import helmet from 'helmet';
import {
    BadRequestException,
    Logger,
    ValidationPipe,
    VersioningType,
} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {appConfig, AppConfig} from '@youtube-clone/api/utils-config';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ExceptionFilter, RequestGuard} from '@youtube-clone/shared-core';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const httpAdapter = app.getHttpAdapter();
    const config = app.get<AppConfig>(appConfig.KEY);

    // helmet should put at 1st before other app.use
    app.use(helmet());

    app.enableCors();
    app.enableShutdownHooks();
    app.use(compression());

        app.useGlobalGuards(new RequestGuard());
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: errors => new BadRequestException(errors),
        }),
    );
    app.useGlobalFilters(new ExceptionFilter(httpAdapter));

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.enableVersioning({
        type: VersioningType.URI,
    });

    const swaggerOptions = new DocumentBuilder()
        .setTitle('Youtube Clone API')
        .setDescription('API document for Youtube Clone')
        .setVersion('1.0.0')
        .addServer(config.domain, 'Development API')
        .addBearerAuth()
        .build();
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDoc, {
        swaggerOptions: {
            docExpansion: 'none',
            filter: true,
            showRequestDuration: true,
        },
    });

    await app.listen(config.port);
    Logger.log(
        `🚀 Application is running on: ${config.domain}/${globalPrefix}`,
        'Nest Application',
    );
    Logger.log(
        `Swagger docs is running on: ${config.domain}/${globalPrefix}/docs`,
        'Nest Application',
    );
}

bootstrap();
