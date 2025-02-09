import SequelizeMaintenanceRepository from "@app/sequelize/repositories/Maintenance";
import Maintenance from "@app/domain/entities/Maintenance";

export default class SearchByBikeUseCase {
  public constructor(
    private readonly maintenanceRepository: SequelizeMaintenanceRepository,
  ) {}

  public async execute(vin: string): Promise<Maintenance[]> {
    return this.maintenanceRepository.searchByBikeVin(vin);
  }
}
