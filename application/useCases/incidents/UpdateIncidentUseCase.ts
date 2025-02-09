import SequelizeIncidentRepository from "@app/sequelize/repositories/Incident";
import Incident from "@app/domain/entities/Incident";
import IncidentNotFoundError from "@app/domain/errors/incidents/IncidentNotFoundError";

export default class UpdateIncidentUseCase {
    
    public constructor(
        private readonly incidentRepository: SequelizeIncidentRepository,
    ) {}

    public async execute(identifier: string, incident: Partial<Incident>): Promise<Incident> {
        
        const updatedIncident = await this.incidentRepository.update(identifier, incident);
        
        if (updatedIncident instanceof IncidentNotFoundError) {
            throw new IncidentNotFoundError();
        }

        return updatedIncident;
    }
}