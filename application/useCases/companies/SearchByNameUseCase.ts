import Company from '@app/domain/entities/Company';
import MongooseCompanyRepository from '@app/mongoose/repositories/Company';

export default class SearchByNameUseCase {
    public constructor(
        private readonly companyRepository: MongooseCompanyRepository,
    ) {}

    public async execute(name: string): Promise<Company[]> {
        return this.companyRepository.searchByName(name);
    }
}