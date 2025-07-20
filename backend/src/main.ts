// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: 'http://localhost:4200',
//     credentials: true
//   });
//   app.useGlobalPipes(new ValidationPipe());
//   await app.listen(5000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express'; // ✅ This is very important!
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // ✅ Using Express here

  // Serve static files
  app.useStaticAssets(join(__dirname, '..', 'frontend', 'dist', 'frontend'));

  // ✅ Handle Angular fallback (SPA support)
  const expressApp = app.getHttpAdapter().getInstance(); // ✅ Get raw Express instance
  expressApp.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'dist', 'frontend', 'index.html'));
  });

  app.enableCors({
    origin: process.env.ORIGIN || 'http://localhost:4200',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
