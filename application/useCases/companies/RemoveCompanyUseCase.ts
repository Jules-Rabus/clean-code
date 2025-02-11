import CompanyNotFoundError from "@app/domain/errors/companies/CompanyNotFoundError";
import CompanyRepository from "@app/domain/repositories/CompanyRepository";

export default class RemoveCompanyUseCase {
  public constructor(
    private readonly companyRepository: CompanyRepository,
  ) {}

  public async execute(identifier: string): Promise<number> {
    const deletedCompany = await this.companyRepository.remove(identifier);

    if (deletedCompany instanceof CompanyNotFoundError) {
      throw new CompanyNotFoundError();
    }

    return deletedCompany;
  }
}
