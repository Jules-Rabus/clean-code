import SequelizeIncidentRepository from "@app/sequelize/repositories/Incident";
import Incident from "@app/domain/entities/Incident";

export default class FindAllIncidentUseCase {
    
    public constructor(
        private readonly incidentRepository: SequelizeIncidentRepository,
    ) {}

    public async execute(): Promise<Incident[]> {
        return this.incidentRepository.findAll();
    }
}