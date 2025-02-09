import CompanyNotFoundError from "@app/domain/errors/companies/CompanyNotFoundError";
import MongooseCompanyRepository from "@app/mongoose/repositories/Company";

export default class RemoveCompanyUseCase {
  public constructor(
    private readonly companyRepository: MongooseCompanyRepository,
  ) {}

  public async execute(identifier: string): Promise<number> {
    const deletedCompany = await this.companyRepository.remove(identifier);

    if (deletedCompany instanceof CompanyNotFoundError) {
      throw new CompanyNotFoundError();
    }

    return deletedCompany;
  }
}
