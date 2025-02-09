import SequelizePartRepository from "@app/sequelize/repositories/Part";
import Part from "@app/domain/entities/Part";

export default class SearchByReferenceUseCase {
  public constructor(
    private readonly partRepository: SequelizePartRepository,
  ) {}

  public async execute(reference: string): Promise<Part[]> {
    return this.partRepository.searchByReference(reference);
  }
}
