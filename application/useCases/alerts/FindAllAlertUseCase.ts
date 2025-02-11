import MongooseAlertRepository from "@app/mongoose/repositories/Alert";
import Alert from "@app/domain/entities/Alert";

export default class FindAllAlertUseCase {
  public constructor(
    private readonly alertRepository: MongooseAlertRepository,
  ) {}

  public async execute(): Promise<Alert[]> {
    return this.alertRepository.findAll();
  }
}
