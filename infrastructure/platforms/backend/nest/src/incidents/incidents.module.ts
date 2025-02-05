import { Module } from '@nestjs/common';
import { IncidentsController } from './incidents.controller';
import incidentsProvider from './incidents.provider';

import SequelizeIncidentRepository from '@app/sequelize/repositories/Incident';

@Module({
  controllers: [IncidentsController],
  providers: [
    SequelizeIncidentRepository,
    ...incidentsProvider
  ],
})
export class IncidentsModule {}
