import { Module } from '@nestjs/common';
import { BikesController } from './bikes.controller';
import bikesProvider from './bikes.provider';

import SequelizeBikeRepository from '@app/sequelize/repositories/Bike';

@Module({
  controllers: [BikesController],
  providers: [
    SequelizeBikeRepository,
    ...bikesProvider
  ],
})
export class BikesModule {}
