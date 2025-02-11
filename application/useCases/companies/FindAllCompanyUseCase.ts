import Company from "@app/domain/entities/Company";
import CompanyRepository from "@app/domain/repositories/CompanyRepository";

export default class FindAllCompanyUseCase {
  public constructor(
    private readonly companyRepository: CompanyRepository,
  ) {}

  public async execute(): Promise<Company[]> {
    return this.companyRepository.findAll();
  }
}
