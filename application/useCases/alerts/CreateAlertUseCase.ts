import MongooseAlertRepository from "@app/mongoose/repositories/Alert";
import Alert from "@app/domain/entities/Alert";

export default class CreateAlertUseCase {
  public constructor(
    private readonly alertRepository: MongooseAlertRepository,
  ) {}

  public async execute(alert: Alert): Promise<Alert> {
    return this.alertRepository.create(alert);
    // @TODO : send notification to users
  }
}
