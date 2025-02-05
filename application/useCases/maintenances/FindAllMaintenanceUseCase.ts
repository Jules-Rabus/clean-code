import SequelizeMaintenanceRepository from "@app/sequelize/repositories/Maintenance";
import Maintenance from "@app/domain/entities/Maintenance";

export default class FindAllMaintenanceUseCase {
    
    public constructor(
        private readonly maintenanceRepository: SequelizeMaintenanceRepository,
    ) {}

    public async execute(): Promise<Maintenance[]> {
        return this.maintenanceRepository.findAll();
    }
}