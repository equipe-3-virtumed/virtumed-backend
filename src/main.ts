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
    .setDescription('General routes documentation')
    .setVersion('1.0.3')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Appointment')
    .addTag('Admin')
    .addTag('Organization / Clinic')
    .addTag('Doctor')
    .addTag('Patient')
    .addTag('Status')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
