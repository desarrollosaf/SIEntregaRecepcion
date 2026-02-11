import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
  app.use(
  '/documentos',
  express.static(join(process.cwd(), 'documentos'))
);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
