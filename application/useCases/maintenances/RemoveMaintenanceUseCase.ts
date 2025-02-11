import MaintenanceNotFoundError from "@app/domain/errors/maintenances/MaintenanceNotFoundError";
import MaintenancesRepository from "@app/domain/repositories/MaintenancesRepository";

export default class RemoveMaintenanceUseCase {
  public constructor(
    private readonly maintenanceRepository: MaintenancesRepository,
  ) {}

  public async execute(identifier: string): Promise<number> {
    const deletedResult = await this.maintenanceRepository.remove(identifier);

    if (deletedResult instanceof MaintenanceNotFoundError) {
      throw new MaintenanceNotFoundError();
    }

    return deletedResult;
  }
}
