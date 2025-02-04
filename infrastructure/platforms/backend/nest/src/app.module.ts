import { Module } from '@nestjs/common';
import { BikesModule } from '@app/nest/src/bikes/bikes.module';
import { UserModule } from '@app/nest/src/users/users.module';
import { AuthModule } from './auth/auth.module';
//import SequelizeConnector from '../../../database/sequelize/sequelize';

@Module({
  imports: [BikesModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
