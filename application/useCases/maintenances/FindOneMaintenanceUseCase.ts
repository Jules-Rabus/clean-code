import MaintenancesRepository from "@app/domain/repositories/MaintenancesRepository";
import Maintenance from "@app/domain/entities/Maintenance";
import MaintenanceNotFoundError from "@app/domain/errors/maintenances/MaintenanceNotFoundError";

export default class FindOneMaintenanceUseCase {
  public constructor(
    private readonly maintenanceRepository: MaintenancesRepository,
  ) {}

  public async execute(identifier: string): Promise<Maintenance> {
    const maintenance = await this.maintenanceRepository.findOne(identifier);

    if (maintenance instanceof MaintenanceNotFoundError) {
      throw new MaintenanceNotFoundError();
    }

    return maintenance;
  }
}
