import { Module } from "@nestjs/common";
import { BikesModule } from "@app/nest/src/bikes/bikes.module";
import { UsersModule } from "@app/nest/src/users/users.module";
import { IncidentsModule } from "./incidents/incidents.module";
import { CompaniesModule } from "./company/companies.module";
import { AlertsModule } from "./alerts/alerts.module";
import { PartsModule } from "./parts/parts.module";
import { MaintenancesModule } from "./maintenances/maintenances.module";
import { TripsModule } from "./trips/trips.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    BikesModule,
    UsersModule,
    IncidentsModule,
    PartsModule,
    CompaniesModule,
    AlertsModule,
    MaintenancesModule,
    TripsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
