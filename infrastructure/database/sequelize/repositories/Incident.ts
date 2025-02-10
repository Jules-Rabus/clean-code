import IncidentsRepository from "@app/domain/repositories/IncidentsRepository";
import IncidentModel from "@app/sequelize/models/Incident";
import IncidentNotFoundError from "@app/domain/errors/incidents/IncidentNotFoundError";

import Incident from "@app/domain/entities/Incident";
import BikeModel from "@app/sequelize/models/Bike";

export default class SequelizeIncidentRepository
  implements IncidentsRepository
{
  async create(incident: Incident): Promise<Incident> {
    const newIncident = await IncidentModel.create(incident);

    return Incident.fromSequelizeModel(newIncident, false);
  }

  async update(
    identifier: string,
    incident: Partial<Incident>,
  ): Promise<Incident | IncidentNotFoundError> {
    const incidentToUpdate = await IncidentModel.findByPk(identifier, {
      include: [BikeModel],
    });

    if (!incidentToUpdate) return new IncidentNotFoundError();

    await incidentToUpdate.update(incident);

    return Incident.fromSequelizeModel(incidentToUpdate);
  }

  async remove(identifier: string): Promise<number | IncidentNotFoundError> {
    const deletedUser = await IncidentModel.destroy({ where: { identifier } });

    if (deletedUser === 0) return new IncidentNotFoundError();

    return deletedUser;
  }

  async findOne(identifier: string): Promise<Incident | IncidentNotFoundError> {
    const incident = await IncidentModel.findByPk(identifier, {
      include: [BikeModel],
    });

    if (!incident) return new IncidentNotFoundError();

    return Incident.fromSequelizeModel(incident);
  }

  async findAll(): Promise<Incident[]> {
    const incidents = await IncidentModel.findAll({
      include: [BikeModel],
    });

    return incidents.map((incident: IncidentModel) => Incident.fromSequelizeModel(incident));
  }

  async searchByBikeVin(vin: string): Promise<Incident[]> {
    const incidents = await IncidentModel.findAll({
      include: [
        {
          model: BikeModel,
          where: { vin },
        },
      ],
    });
      

    return incidents.map((incident: IncidentModel) => Incident.fromSequelizeModel(incident));
  }
}
