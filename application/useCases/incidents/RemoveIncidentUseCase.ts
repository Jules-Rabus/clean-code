import Incident from "@app/domain/entities/Incident";
import IncidentNotFoundError from "@app/domain/errors/incidents/IncidentNotFoundError";
import SequelizeIncidentRepository from "@app/sequelize/repositories/Incident";

export default class RemoveIncidentUseCase {
    
    public constructor(
        private readonly incidentRepository: SequelizeIncidentRepository,
    ) {}

    public async execute(id: string): Promise<number> {
        
        const deletedResult = await this.incidentRepository.remove(id);

        if(deletedResult instanceof IncidentNotFoundError) {
            throw new IncidentNotFoundError();
        }

        return deletedResult;
    }
}