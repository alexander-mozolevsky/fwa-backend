import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NodeProcesses } from './constants/process';
import helmet from 'helmet';

if (process.env.NODE_ENV?.trim() === 'development') {
  require('dotenv').config();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  console.log('--- Starting with ---');
  console.log(process.env.NODE_ENV);
  console.log(process.env.POSTGRES_DB);
  console.log(NodeProcesses());
  await app.listen(NodeProcesses().PORT || 8080);
}

bootstrap();
