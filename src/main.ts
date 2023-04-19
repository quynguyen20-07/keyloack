import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  const configService = app.get(ConfigService);

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Prefix
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('MRQ-COFFEE')
    .setDescription('The MRQ-COFFEE API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  const port = configService.get<number>('APP_PORT');
  await app.listen(port || 8080);
}

bootstrap();
