import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NodeProcesses } from './constants/process';
import helmet from 'helmet';

const fullPath =
  process.env.NODE_ENV?.trim() === 'development'
    ? '.env'
    : path.resolve('/', '/opt/elasticbeanstalk/deployment/env');

require('dotenv').config({
  path: fullPath,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  console.log('--- Starting with ---');
  console.log(fullPath);
  console.log(process.env.NODE_ENV);
  console.log(process.env.RDS_DB_NAME);
  console.log(NodeProcesses());
  await app.listen(NodeProcesses().PORT || 8080);
}

bootstrap();
