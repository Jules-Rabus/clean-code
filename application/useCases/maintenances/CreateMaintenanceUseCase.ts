import MaintenancesRepository from "@app/domain/repositories/MaintenancesRepository";
import Maintenance from "@app/domain/entities/Maintenance";

export default class CreateMaintenanceUseCase {
  public constructor(
    private readonly maintenanceRepository: MaintenancesRepository,
  ) {}

  public async execute(maintenance: Maintenance): Promise<Maintenance> {
    return this.maintenanceRepository.create(maintenance);
  }
}
