import IncidentsRepository from "@app/domain/repositories/IncidentsRepository";
import Incident from "@app/domain/entities/Incident";

export default class FindAllIncidentUseCase {
  public constructor(
    private readonly incidentRepository: IncidentsRepository,
  ) {}

  public async execute(): Promise<Incident[]> {
    return this.incidentRepository.findAll();
  }
}
