import IncidentsRepository from '@app/domain/repositories/IncidentsRepository';
import IncidentModel from '@app/sequelize/models/Incident';
import IncidentNotFoundError from '@app/domain/errors/incidents/IncidentNotFoundError';

import Incident from '@app/domain/entities/Incident';
import BikeModel from '@app/sequelize/models/Bike';

export default class SequelizeIncidentRepository implements IncidentsRepository {

    async create(incident: Incident): Promise<Incident> {
        const newIncident = await IncidentModel.create(incident);

        return Incident.fromSequelizeModel(newIncident, false);
    }

    async update(identifier: string, incident: Partial<Incident>): Promise<Incident | null> {
        const incidentToUpdate = await IncidentModel.findByPk(identifier);

        if(!incidentToUpdate) throw new IncidentNotFoundError();

        await incidentToUpdate.update(incident);

        return Incident.fromSequelizeModel(incidentToUpdate, false);
    }

    async remove(identifier: string): Promise<void> {
        const incident = await IncidentModel.findByPk(identifier);

        if(!incident) throw new IncidentNotFoundError();

        await incident.destroy();
    }

    async findOne(identifier: string): Promise<Incident | null> {
        const incident = await IncidentModel.findByPk(identifier, {
            include: [ BikeModel ]
        });

        if(!incident) throw new IncidentNotFoundError();

        return Incident.fromSequelizeModel(incident);
    }

    async findAll(): Promise<Incident[]> {
        const incidents = await IncidentModel.findAll({
            include: [ BikeModel]
        });

        return incidents.map((incident) => Incident.fromSequelizeModel(incident));
    }

    async searchByBikeVin(vin: string): Promise<Incident[]> {
        /*const incidents = await IncidentModel.findAll({
            where: {
                bike: {
                    [Op.like]: `%${vin}%`
                }
            }
        });
        */
        const incidents: any[] = []; // @TODO: Implement search by bike vin

        return incidents.map((incident) => Incident.fromSequelizeModel(incident));
    }
}

