import { Module } from "@nestjs/common";
import { MaintenancesController } from "./maintenances.controller";
import maintenancesProvider from "./maintenances.provider";

import SequelizeMaintenanceRepository from "@app/sequelize/repositories/Maintenance";

@Module({
  controllers: [MaintenancesController],
  providers: [SequelizeMaintenanceRepository, ...maintenancesProvider],
})
export class MaintenancesModule {}
