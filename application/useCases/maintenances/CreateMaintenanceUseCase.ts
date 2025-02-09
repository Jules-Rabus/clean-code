import SequelizeMaintenanceRepository from "@app/sequelize/repositories/Maintenance";
import Maintenance from "@app/domain/entities/Maintenance";

export default class CreateMaintenanceUseCase {
  public constructor(
    private readonly maintenanceRepository: SequelizeMaintenanceRepository,
  ) {}

  public async execute(maintenance: Maintenance): Promise<Maintenance> {
    return this.maintenanceRepository.create(maintenance);
  }
}
