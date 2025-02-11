import Company from "@app/domain/entities/Company";
import CompanyRepository from "@app/domain/repositories/CompanyRepository";

export default class CreateCompanyUseCase {
  public constructor(
    private readonly companyRepository: CompanyRepository,
  ) {}

  public async execute(company: Company): Promise<Company> {
    return this.companyRepository.create(company);
  }
}
