import Company from "@app/domain/entities/Company";
import CompanyNotFoundError from "@app/domain/errors/companies/CompanyNotFoundError";
import MongooseCompanyRepository from "@app/mongoose/repositories/Company";

export default class FindOneCompanyUseCase {
  public constructor(
    private readonly companyRepository: MongooseCompanyRepository,
  ) {}

  public async execute(identifier: string): Promise<Company> {
    const company = await this.companyRepository.findOne(identifier);

    if (company instanceof CompanyNotFoundError) {
      throw new CompanyNotFoundError();
    }

    return company;
  }
}
