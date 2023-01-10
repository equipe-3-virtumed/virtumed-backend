import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // app.set('trust-proxy', 1);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Backend Virtumed')
    .setDescription('Documentação de rotas para cadastro, autorização e acesso')
    .setVersion('1.0.3')
    .addBearerAuth()
    .addTag('Room')
    .addTag('Auth')
    .addTag('Patient')
    .addTag('Doctor')
    .addTag('Organization / Clinic')
    .addTag('Admin')
    .addTag('Status')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3333);
}
bootstrap();
