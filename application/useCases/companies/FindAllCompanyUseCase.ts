import Company from '@app/domain/entities/Company';
import MongooseCompanyRepository from '@app/mongoose/repositories/Company';

export default class FindAllCompanyUseCase {
    public constructor(
        private readonly companyRepository: MongooseCompanyRepository,
    ) {}

    public async execute(): Promise<Company[]> {
        return this.companyRepository.findAll();
    }
}