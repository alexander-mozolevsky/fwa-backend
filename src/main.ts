import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import 'module-alias/register';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as path from 'path';

import { NodeProcesses } from '@constants/process';

import { AppModule } from './app.module';

const fullPath =
    process.env.NODE_ENV?.trim() === 'development'
        ? '.env'
        : path.resolve('/', '/opt/elasticbeanstalk/deployment/env');

require('dotenv').config({
    path: fullPath,
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: ['error'] });

    app.use(helmet());
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    const PORT = NodeProcesses().PORT || 8080;

    console.log(`----- Starting the server on the ${PORT} -----`);

    await app.listen(PORT);
}

bootstrap();
