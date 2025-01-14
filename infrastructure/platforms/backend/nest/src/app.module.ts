import { Module } from '@nestjs/common';
import { BikesModule } from '@app/nest/src/bikes/bikes.module';
//import SequelizeConnector from '../../../database/sequelize/sequelize';

@Module({
  imports: [BikesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
