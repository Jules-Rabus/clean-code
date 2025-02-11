import PartNotFoundError from "@app/domain/errors/parts/PartNotFoundError";
import PartsRepository from "@app/domain/repositories/PartsRepository";

export default class RemovePartUseCase {
  public constructor(
    private readonly partRepository: PartsRepository,
  ) {}

  public async execute(identifier: string): Promise<number> {
    const deletedPart = await this.partRepository.remove(identifier);

    if (deletedPart instanceof PartNotFoundError) {
      throw new PartNotFoundError();
    }

    return deletedPart;
  }
}
