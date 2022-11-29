import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
    origin: "*",
    credentials: true,
    methods: '*',
    allowedHeaders: 'Authorization, *',
    preflightContinue: false
  }});

  const config = new DocumentBuilder()
    .setTitle('Backend Virtumed')
    .setDescription('Documentação de rotas para cadastro, autorização e acesso')
    .setVersion('1.0.2')
    .addBearerAuth()
    .addTag('Status')
    .addTag('AdminAuth')
    .addTag('Admin')
    .addTag('Organization / Clinic')
    .addTag('Doctor')
    .addTag('Patient')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3333);
}
bootstrap();
