import AlertsRepository from "@app/domain/repositories/AlertsRepository";
import Alert from "@app/domain/entities/Alert";
import AlertNotFoundError from "@app/domain/errors/alerts/AlertNotFoundError";

export default class FindOneAlertUseCase {
  public constructor(
    private readonly alertRepository: AlertsRepository,
  ) {}

  public async execute(identifier: string): Promise<Alert> {
    const alert = await this.alertRepository.findOne(identifier);

    if (alert instanceof AlertNotFoundError) {
      throw new AlertNotFoundError();
    }

    return alert;
  }
}
