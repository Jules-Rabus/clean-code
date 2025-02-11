import IncidentsRepository from "@app/domain/repositories/IncidentsRepository";
import Incident from "@app/domain/entities/Incident";

export default class SearchByBikeUseCase {
  public constructor(
    private readonly incidentRepository: IncidentsRepository,
  ) {}

  public async execute(vin: string): Promise<Incident[]> {
    return this.incidentRepository.searchByBikeVin(vin);
  }
}
