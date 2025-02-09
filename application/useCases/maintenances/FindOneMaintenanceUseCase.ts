import SequelizeMaintenanceRepository from "@app/sequelize/repositories/Maintenance";
import Maintenance from "@app/domain/entities/Maintenance";
import MaintenanceNotFoundError from "@app/domain/errors/maintenances/MaintenanceNotFoundError";

export default class FindOneMaintenanceUseCase {
  public constructor(
    private readonly maintenanceRepository: SequelizeMaintenanceRepository,
  ) {}

  public async execute(identifier: string): Promise<Maintenance> {
    const maintenance = await this.maintenanceRepository.findOne(identifier);

    if (maintenance instanceof MaintenanceNotFoundError) {
      throw new MaintenanceNotFoundError();
    }

    return maintenance;
  }
}
