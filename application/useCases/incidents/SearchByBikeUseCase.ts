import SequelizeIncidentRepository from "@app/sequelize/repositories/Incident";
import Incident from "@app/domain/entities/Incident";

export default class SearchByBikeUseCase {
  public constructor(
    private readonly incidentRepository: SequelizeIncidentRepository,
  ) {}

  public async execute(vin: string): Promise<Incident[]> {
    return this.incidentRepository.searchByBikeVin(vin);
  }
}
