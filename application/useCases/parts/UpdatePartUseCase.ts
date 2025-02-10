import SequelizePartRepository from "@app/sequelize/repositories/Part";
import Part from "@app/domain/entities/Part";
import PartNotFoundError from "@app/domain/errors/parts/PartNotFoundError";

import CreateAlertUseCase from "../alerts/CreateAlertUseCase";
import Alert from "@app/domain/entities/alert";

export default class UpdatePartUseCase {
  public constructor(
    private readonly partRepository: SequelizePartRepository,
    private readonly createAlertUseCase: CreateAlertUseCase,
  ) {}

  public async execute(identifier: string, part: Partial<Part>): Promise<Part> {
    const updatedPart = await this.partRepository.update(identifier, part);

    if (updatedPart instanceof PartNotFoundError) {
      throw new PartNotFoundError();
    }

    if (updatedPart.minStockLevel > updatedPart.stockQuantity && part.stockQuantity) {
      const alert: Alert = {
        title: "Low stock",
        description: "The stock is low, please order more",
        part: identifier,
      };
      await this.createAlertUseCase.execute(alert);
    }

    return updatedPart;
  }
}
