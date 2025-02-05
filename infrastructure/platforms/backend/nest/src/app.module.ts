import { Module } from '@nestjs/common';
import { BikesModule } from '@app/nest/src/bikes/bikes.module';
import { UserModule } from '@app/nest/src/users/users.module';
import { IncidentsModule } from './incidents/incidents.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BikesModule, UserModule, IncidentsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
