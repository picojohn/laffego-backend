import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { bold } from 'chalk';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import {  json } from 'express';
import  { join } from 'path';


async function bootstrap() { 
  var express = require('express')
  const port = process.env.PORT || 8080;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '../public'));
  app.use(cors())
  //app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('');
  app.use(json({ limit: '50mb' }));


  /**Configuracion de Swagger */
  const config = new DocumentBuilder()
    .setTitle(process.env.APPLICATION_NAME)
    .setDescription('Registros policia backend')
    .setVersion('1.0')
    .addTag(process.env.APPLICATION_NAME)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
  Logger.log(
    bold.blue(process.env.APPLICATION_NAME) +
    bold.yellow(' Running On Port ') +
    bold.green(`http://localhost:${port}`),
    'Bootstrap',
  );
}
bootstrap();
