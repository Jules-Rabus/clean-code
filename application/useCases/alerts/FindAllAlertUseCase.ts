import AlertsRepository from "@app/domain/repositories/AlertsRepository";
import Alert from "@app/domain/entities/Alert";

export default class FindAllAlertUseCase {
  public constructor(
    private readonly alertRepository: AlertsRepository,
  ) {}

  public async execute(): Promise<Alert[]> {
    return this.alertRepository.findAll();
  }
}
