import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ----- modif correspondant à Swagger --------- //
  const config = new DocumentBuilder()
    .setTitle('Pong Arena')
    .setDescription('Play Pong for fame and glory !')
    .setVersion('1.0')
    .addTag('pong')
    .build();
  const document = SwaggerModule.createDocument(app, config); // -> crée un doc qui répertorie toutes les routes HTTP de notre API
  SwaggerModule.setup('api', app, document);
  // ----- fin modif Swagger --------------------- //

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
