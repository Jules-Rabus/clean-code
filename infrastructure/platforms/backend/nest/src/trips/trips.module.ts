import { Module } from "@nestjs/common";
import { TripsController } from "./trips.controller";
import tripsProvider from "./trips.provider";

import SequelizeTripRepository from "@app/sequelize/repositories/Trip";

@Module({
  controllers: [TripsController],
  providers: [SequelizeTripRepository, ...tripsProvider],
})
export class TripsModule {}
