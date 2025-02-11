import Company from "@app/domain/entities/Company";
import CompanyNotFoundError from "@app/domain/errors/companies/CompanyNotFoundError";
import CompanyRepository from "@app/domain/repositories/CompanyRepository";

export default class FindOneCompanyUseCase {
  public constructor(
    private readonly companyRepository: CompanyRepository,
  ) {}

  public async execute(identifier: string): Promise<Company> {
    const company = await this.companyRepository.findOne(identifier);

    if (company instanceof CompanyNotFoundError) {
      throw new CompanyNotFoundError();
    }

    return company;
  }
}
