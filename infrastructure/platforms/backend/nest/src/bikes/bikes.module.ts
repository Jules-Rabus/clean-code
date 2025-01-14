import { Module } from '@nestjs/common';
import { BikesController } from './bikes.controller';
import bikesProvider from './bikes.provider';

@Module({
  controllers: [BikesController],
  providers: [...bikesProvider],
})
export class BikesModule {}
