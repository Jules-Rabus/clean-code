import SequelizeIncidentRepository from "@app/sequelize/repositories/Incident";
import Incident from "@app/domain/entities/Incident";

export default class CreateIncidentUseCase {
  public constructor(
    private readonly incidentRepository: SequelizeIncidentRepository,
  ) {}

  public async execute(incident: Incident): Promise<Incident> {
    return this.incidentRepository.create(incident);
  }
}
