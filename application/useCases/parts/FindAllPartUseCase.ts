import PartsRepository from "@app/domain/repositories/PartsRepository";
import Part from "@app/domain/entities/Part";

export default class FindAllPartUseCase {
  public constructor(
    private readonly partRepository: PartsRepository,
  ) {}

  public async execute(): Promise<Part[]> {
    return this.partRepository.findAll();
  }
}
