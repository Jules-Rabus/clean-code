import PartsRepository from "@app/domain/repositories/PartsRepository";
import Part from "@app/domain/entities/Part";

export default class SearchByReferenceUseCase {
  public constructor(
    private readonly partRepository: PartsRepository,
  ) {}

  public async execute(reference: string): Promise<Part[]> {
    return this.partRepository.searchByReference(reference);
  }
}
