import IncidentsRepository from "@app/domain/repositories/IncidentsRepository";
import Incident from "@app/domain/entities/Incident";

export default class CreateIncidentUseCase {
  public constructor(
    private readonly incidentRepository: IncidentsRepository,
  ) {}

  public async execute(incident: Incident): Promise<Incident> {
    return this.incidentRepository.create(incident);
  }
}
