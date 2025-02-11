import IncidentNotFoundError from "@app/domain/errors/incidents/IncidentNotFoundError";
import IncidentsRepository from "@app/domain/repositories/IncidentsRepository";

export default class RemoveIncidentUseCase {
  public constructor(
    private readonly incidentRepository: IncidentsRepository,
  ) {}

  public async execute(identifier: string): Promise<number> {
    const deletedResult = await this.incidentRepository.remove(identifier);

    if (deletedResult instanceof IncidentNotFoundError) {
      throw new IncidentNotFoundError();
    }

    return deletedResult;
  }
}
