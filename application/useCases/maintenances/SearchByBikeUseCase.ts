import MaintenancesRepository from "@app/domain/repositories/MaintenancesRepository";
import Maintenance from "@app/domain/entities/Maintenance";

export default class SearchByBikeUseCase {
  public constructor(
    private readonly maintenanceRepository: MaintenancesRepository,
  ) {}

  public async execute(vin: string): Promise<Maintenance[]> {
    return this.maintenanceRepository.searchByBikeVin(vin);
  }
}
