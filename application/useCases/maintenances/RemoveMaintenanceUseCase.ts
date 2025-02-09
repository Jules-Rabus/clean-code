import MaintenanceNotFoundError from "@app/domain/errors/maintenances/MaintenanceNotFoundError";
import SequelizeMaintenanceRepository from "@app/sequelize/repositories/Maintenance";

export default class RemoveMaintenanceUseCase {
    
    public constructor(
        private readonly maintenanceRepository: SequelizeMaintenanceRepository,
    ) {}

    public async execute(id: string): Promise<number> {
        const deletedResult = await this.maintenanceRepository.remove(id);

        if(deletedResult instanceof MaintenanceNotFoundError) {
            throw new MaintenanceNotFoundError();
        }

        return deletedResult;
    }
}