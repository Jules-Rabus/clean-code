import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import SequelizeConnector from '@app/sequelize/sequelize';
//import MongooseConnector from '@app/mongoose/mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Bikes API')
  .setDescription('The bikes API description')
  .setVersion('1.0')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, documentFactory);

  const sequelizeConnector = new SequelizeConnector();
  await sequelizeConnector.connect();

  //const mongooseConnector = new MongooseConnector();
  //await mongooseConnector.connect();

  await app.listen(process.env['PORT'] ?? 3000);
}

bootstrap();

