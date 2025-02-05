import SequelizeIncidentRepository from "@app/sequelize/repositories/Incident";

export default class RemoveIncidentUseCase {
    
    public constructor(
        private readonly incidentRepository: SequelizeIncidentRepository,
    ) {}

    public async execute(id: string): Promise<void> {
        await this.incidentRepository.remove(id);
    }
}