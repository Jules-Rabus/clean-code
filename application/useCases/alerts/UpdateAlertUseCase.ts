import MongooseAlertRepository from "@app/mongoose/repositories/Alert";
import Alert from "@app/domain/entities/Alert";
import AlertNotFoundError from "@app/domain/errors/alerts/AlertNotFoundError";

export default class UpdateAlertUseCase {
  public constructor(
    private readonly alertRepository: MongooseAlertRepository,
  ) {}

  public async execute(
    identifier: string,
    alert: Partial<Alert>,
  ): Promise<Alert> {
    const updatedAlert = await this.alertRepository.update(identifier, alert);

    if (updatedAlert instanceof AlertNotFoundError) {
      throw new AlertNotFoundError();
    }

    return updatedAlert;
  }
}
