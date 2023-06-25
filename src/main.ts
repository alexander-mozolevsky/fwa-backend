import 'module-alias/register';

const fullPath =
    process.env.NODE_ENV?.trim() === 'development'
        ? '.env'
        : path.resolve('/', '/opt/elasticbeanstalk/deployment/env');

require('dotenv').config({
    path: fullPath,
});


import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as path from 'path';

import { NodeProcesses } from '@constants/processes';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: ['error'] });

    // Swagger initialization
    const config = new DocumentBuilder()
        .setTitle('FWA Swagger')
        .setDescription('The FWA API Recommendations engine')
        .setVersion('1.0')
        .addTag('recommendations')
        .build();

    app.use(helmet());
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    const PORT = NodeProcesses.PORT || 8080;

    console.log(`----- Starting the server on the ${PORT} -----`);

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT);
}

bootstrap();
