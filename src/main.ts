import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NodeProcesses } from './constants/process';
import helmet from 'helmet';

require('dotenv').config(
  process.env.NODE_ENV === 'development' && {
    path: path.resolve(`.env.${process.env.NODE_ENV || 'development'}`).trim(),
  },
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  await app.listen(NodeProcesses.PORT || 3000);
}

bootstrap();
