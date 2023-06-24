import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NodeProcesses } from './constants/process';
import helmet from 'helmet';

const path =
  process.env.NODE_ENV?.trim() === 'development'
    ? path.resolve(__dirname, '.env')
    : path.resolve('/', '/opt/elasticbeanstalk/deployment/env');

require('dotenv').config({
  path,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  console.log('--- Starting with ---');
  console.log(path);
  console.log(process.env.NODE_ENV);
  console.log(process.env.RDS_DB_NAME);
  console.log(NodeProcesses());
  await app.listen(NodeProcesses().PORT || 8080);
}

bootstrap();
