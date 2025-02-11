import PartsRepository from "@app/domain/repositories/PartsRepository";
import Part from "@app/domain/entities/Part";
import PartNotFoundError from "@app/domain/errors/parts/PartNotFoundError";

export default class FindOnePartUseCase {
  public constructor(
    private readonly partRepository: PartsRepository,
  ) {}

  public async execute(identifier: string): Promise<Part> {
    const part = await this.partRepository.findOne(identifier);

    if (part instanceof PartNotFoundError) {
      throw new PartNotFoundError();
    }

    return part;
  }
}
