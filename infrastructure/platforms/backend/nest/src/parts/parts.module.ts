import { Module } from '@nestjs/common';
import { PartsController } from './parts.controller';
import partsProvider from './part.provider';

import SequelizePartRepository from '@app/sequelize/repositories/Part';

@Module({
  controllers: [PartsController],
  providers: [
    SequelizePartRepository,
    ...partsProvider,
  ],
})
export class PartsModule {}
