import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://front-a1tcjzaro-estagio-legal.vercel.app',
    allowedHeaders: [
      'Origin',
      'X-Requested',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    methods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
