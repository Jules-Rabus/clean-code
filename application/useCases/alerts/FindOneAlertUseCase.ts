import MongooseAlertRepository from "@app/mongoose/repositories/Alert";
import Alert from "@app/domain/entities/alert";
import AlertNotFoundError from "@app/domain/errors/alerts/AlertNotFoundError";

export default class FindOneAlertUseCase {
  public constructor(
    private readonly alertRepository: MongooseAlertRepository,
  ) {}

  public async execute(identifier: string): Promise<Alert> {
    const alert = await this.alertRepository.findOne(identifier);

    if (alert instanceof AlertNotFoundError) {
      throw new AlertNotFoundError();
    }

    return alert;
  }
}
