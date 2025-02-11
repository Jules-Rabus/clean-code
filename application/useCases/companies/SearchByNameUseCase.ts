import Company from "@app/domain/entities/Company";
import CompanyRepository from "@app/domain/repositories/CompanyRepository";

export default class SearchByNameUseCase {
  public constructor(
    private readonly companyRepository: CompanyRepository,
  ) {}

  public async execute(name: string): Promise<Company[]> {
    return this.companyRepository.searchByName(name);
  }
}
