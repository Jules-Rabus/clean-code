import SequelizeMaintenanceRepository from "@app/sequelize/repositories/Maintenance";
import Maintenance from "@app/domain/entities/Maintenance";

export default class UpdateMaintenanceUseCase {
        
    public constructor(
        private readonly maintenanceRepository: SequelizeMaintenanceRepository,
    ) {}

    public async execute(identifier: string, maintenance: Partial<Maintenance>): Promise<Maintenance | null> {
        return this.maintenanceRepository.update(identifier, maintenance);
    }
}