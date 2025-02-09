import PartNotFoundError from "@app/domain/errors/parts/PartNotFoundError";
import SequelizePartRepository from "@app/sequelize/repositories/Part";

export default class RemovePartUseCase {
  public constructor(
    private readonly partRepository: SequelizePartRepository,
  ) {}

  public async execute(identifier: string): Promise<number> {
    const deletedPart = await this.partRepository.remove(identifier);

    if (deletedPart instanceof PartNotFoundError) {
      throw new PartNotFoundError();
    }

    return deletedPart;
  }
}
