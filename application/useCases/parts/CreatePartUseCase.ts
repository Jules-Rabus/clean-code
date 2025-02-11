import PartsRepository from "@app/domain/repositories/PartsRepository";
import Part from "@app/domain/entities/Part";

export default class CreatePartUseCase {
  public constructor(
    private readonly partRepository: PartsRepository,
  ) {}

  public async execute(part: Part): Promise<Part> {
    return this.partRepository.create(part);
  }
}
