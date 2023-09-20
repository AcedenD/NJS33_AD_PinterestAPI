import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: "*"})
  app.use(express.static("."))


  const congfig = new DocumentBuilder()
  .setTitle("NODE 33 ").addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, congfig);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(8080);
}
bootstrap();
