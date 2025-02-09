import { Module } from "@nestjs/common";
import { AlertsController } from "./alerts.controller";
import alertsProvider from "./alerts.provider";

import MongooseAlertRepository from "@app/mongoose/repositories/Alert";

@Module({
  controllers: [AlertsController],
  providers: [MongooseAlertRepository, ...alertsProvider],
})
export class AlertsModule {}
