/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow requests from your Angular app
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:4300'],
    credentials: true,
  });

  // Increase payload size limit (for image file buffers)
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

  // Global DTO validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);
}
bootstrap();
