import AlertsRepository from "@app/domain/repositories/AlertsRepository";
import Alert from "@app/domain/entities/Alert";
import AlertNotFoundError from "@app/domain/errors/alerts/AlertNotFoundError";

export default class SearchByPartUseCase {
  public constructor(
    private readonly alertRepository: AlertsRepository,
  ) {}

  public async execute(part: string): Promise<Alert[]> {
    const alerts = await this.alertRepository.searchByPart(part);

    if (alerts.length === 0) {
      throw new AlertNotFoundError();
    }

    return alerts;
  }
}
