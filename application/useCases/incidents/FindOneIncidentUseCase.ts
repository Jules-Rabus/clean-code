import SequelizeIncidentRepository from "@app/sequelize/repositories/Incident";
import Incident from "@app/domain/entities/Incident";

export default class FindOneIncidentUseCase {
    
    public constructor(
        private readonly incidentRepository: SequelizeIncidentRepository,
    ) {}

    public async execute(id: string): Promise<Incident | null> {
        return this.incidentRepository.findOne(id);
    }
}