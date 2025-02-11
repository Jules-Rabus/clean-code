import Company from "@app/domain/entities/Company";
import CompanyNotFoundError from "@app/domain/errors/companies/CompanyNotFoundError";
import CompanyRepository from "@app/domain/repositories/CompanyRepository";

export default class UpdateCompanyUseCase {
  public constructor(
    private readonly companyRepository: CompanyRepository,
  ) {}

  public async execute(
    identifier: string,
    company: Partial<Company>,
  ): Promise<Company> {
    const updatedCompany = await this.companyRepository.update(
      identifier,
      company,
    );

    if (updatedCompany instanceof CompanyNotFoundError) {
      throw new CompanyNotFoundError();
    }

    return updatedCompany;
  }
}
