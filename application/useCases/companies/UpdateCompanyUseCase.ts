import Company from '@app/domain/entities/Company';
import CompanyNotFoundError from '@app/domain/errors/companies/CompanyNotFoundError';
import MongooseCompanyRepository from '@app/mongoose/repositories/Company';

export default class UpdateCompanyUseCase {
    public constructor(
        private readonly companyRepository: MongooseCompanyRepository,
    ) {}

    public async execute(id: string, company: Partial<Company>): Promise<Company> {

        const updatedCompany = await this.companyRepository.update(id, company);

        if (updatedCompany instanceof CompanyNotFoundError) {
            throw new CompanyNotFoundError();
        }

        return updatedCompany;
    }
}