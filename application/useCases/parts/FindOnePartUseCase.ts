import SequelizePartRepository from "@app/sequelize/repositories/Part";
import Part from "@app/domain/entities/Part";
import PartNotFoundError from "@app/domain/errors/parts/PartNotFoundError";

export default class FindOnePartUseCase {
  public constructor(
    private readonly partRepository: SequelizePartRepository,
  ) {}

  public async execute(identifier: string): Promise<Part> {
    const part = await this.partRepository.findOne(identifier);

    if (part instanceof PartNotFoundError) {
      throw new PartNotFoundError();
    }

    return part;
  }
}
