import AlertsRepository from "@app/domain/repositories/AlertsRepository";
import Alert from "@app/domain/entities/Alert";

export default class CreateAlertUseCase {
  public constructor(
    private readonly alertRepository: AlertsRepository,
  ) {}

  public async execute(alert: Alert): Promise<Alert> {
    return this.alertRepository.create(alert);
    // @TODO : send notification to users
  }
}
