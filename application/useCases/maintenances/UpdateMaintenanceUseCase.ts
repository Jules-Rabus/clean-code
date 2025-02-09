import SequelizeMaintenanceRepository from "@app/sequelize/repositories/Maintenance";
import Maintenance from "@app/domain/entities/Maintenance";
import MaintenanceNotFoundError from "@app/domain/errors/maintenances/MaintenanceNotFoundError";

export default class UpdateMaintenanceUseCase {
        
    public constructor(
        private readonly maintenanceRepository: SequelizeMaintenanceRepository,
    ) {}

    public async execute(identifier: string, maintenance: Partial<Maintenance>): Promise<Maintenance> {
        
        const updatedMaintenance = await this.maintenanceRepository.update(identifier, maintenance);

        if(updatedMaintenance instanceof MaintenanceNotFoundError) {
            throw new MaintenanceNotFoundError();
        }

        return updatedMaintenance;
    }
}