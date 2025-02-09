import SequelizeIncidentRepository from "@app/sequelize/repositories/Incident";
import Incident from "@app/domain/entities/Incident";
import IncidentNotFoundError from "@app/domain/errors/incidents/IncidentNotFoundError";

export default class FindOneIncidentUseCase {
  public constructor(
    private readonly incidentRepository: SequelizeIncidentRepository,
  ) {}

  public async execute(identifier: string): Promise<Incident> {
    const incident = await this.incidentRepository.findOne(identifier);

    if (incident instanceof IncidentNotFoundError) {
      throw new IncidentNotFoundError();
    }

    return incident;
  }
}
