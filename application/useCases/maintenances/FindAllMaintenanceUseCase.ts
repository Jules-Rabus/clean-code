import MaintenancesRepository from "@app/domain/repositories/MaintenancesRepository";
import Maintenance from "@app/domain/entities/Maintenance";

export default class FindAllMaintenanceUseCase {
  public constructor(
    private readonly maintenanceRepository: MaintenancesRepository,
  ) {}

  public async execute(): Promise<Maintenance[]> {
    return this.maintenanceRepository.findAll();
  }
}
