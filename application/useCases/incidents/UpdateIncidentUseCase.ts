import SequelizeIncidentRepository from "@app/sequelize/repositories/Incident";
import Incident from "@app/domain/entities/Incident";

export default class UpdateIncidentUseCase {
    
    public constructor(
        private readonly incidentRepository: SequelizeIncidentRepository,
    ) {}

    public async execute(identifier: string, incident: Partial<Incident>): Promise<Incident | null> {
        return this.incidentRepository.update(identifier, incident);
    }
}