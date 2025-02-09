import MongooseAlertRepository from "@app/mongoose/repositories/Alert";
import Alert from "@app/domain/entities/alert";
import AlertNotFoundError from "@app/domain/errors/alerts/AlertNotFoundError";

export default class SearchByPartUseCase {
  public constructor(
    private readonly alertRepository: MongooseAlertRepository,
  ) {}

  public async execute(part: string): Promise<Alert[]> {
    const alerts = await this.alertRepository.searchByPart(part);

    if (alerts.length === 0) {
      throw new AlertNotFoundError();
    }

    return alerts;
  }
}
