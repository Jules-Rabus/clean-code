import MaintenancesRepository from "@app/domain/repositories/MaintenancesRepository";
import Maintenance from "@app/domain/entities/Maintenance";
import MaintenanceNotFoundError from "@app/domain/errors/maintenances/MaintenanceNotFoundError";

export default class UpdateMaintenanceUseCase {
  public constructor(
    private readonly maintenanceRepository: MaintenancesRepository,
  ) {}

  public async execute(
    identifier: string,
    maintenance: Partial<Maintenance>,
  ): Promise<Maintenance> {
    const updatedMaintenance = await this.maintenanceRepository.update(
      identifier,
      maintenance,
    );

    if (updatedMaintenance instanceof MaintenanceNotFoundError) {
      throw new MaintenanceNotFoundError();
    }

    return updatedMaintenance;
  }
}
