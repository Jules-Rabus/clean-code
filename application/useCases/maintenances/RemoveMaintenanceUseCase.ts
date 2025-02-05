import SequelizeMaintenanceRepository from "@app/sequelize/repositories/Maintenance";

export default class RemoveMaintenanceUseCase {
    
    public constructor(
        private readonly maintenanceRepository: SequelizeMaintenanceRepository,
    ) {}

    public async execute(id: string): Promise<void> {
        return this.maintenanceRepository.remove(id);
    }
}