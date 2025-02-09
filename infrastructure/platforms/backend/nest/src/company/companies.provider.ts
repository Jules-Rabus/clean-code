import CreateCompanyUseCase from "@app/application/useCases/companies/CreateCompanyUseCase";
import RemoveCompanyUseCase from "@app/application/useCases/companies/RemoveCompanyUseCase";
import UpdateCompanyUseCase from "@app/application/useCases/companies/UpdateCompanyUseCase";
import FindOneCompanyUseCase from "@app/application/useCases/companies/FindOneCompanyUseCase";
import FindAllCompanyUseCase from "@app/application/useCases/companies/FindAllCompanyUseCase";
import SearchByNameUseCase from "@app/application/useCases/companies/SearchByNameUseCase";

import MongooseCompanyRepository from "@app/mongoose/repositories/Company";

export const CreateCompanyUseCaseProvider = {
  provide: CreateCompanyUseCase,
  useFactory: (companyRepository: MongooseCompanyRepository) =>
    new CreateCompanyUseCase(companyRepository),
  inject: [MongooseCompanyRepository],
};

export const RemoveCompanyUseCaseProvider = {
  provide: RemoveCompanyUseCase,
  useFactory: (companyRepository: MongooseCompanyRepository) =>
    new RemoveCompanyUseCase(companyRepository),
  inject: [MongooseCompanyRepository],
};

export const UpdateCompanyUseCaseProvider = {
  provide: UpdateCompanyUseCase,
  useFactory: (companyRepository: MongooseCompanyRepository) =>
    new UpdateCompanyUseCase(companyRepository),
  inject: [MongooseCompanyRepository],
};

export const FindOneCompanyUseCaseProvider = {
  provide: FindOneCompanyUseCase,
  useFactory: (companyRepository: MongooseCompanyRepository) =>
    new FindOneCompanyUseCase(companyRepository),
  inject: [MongooseCompanyRepository],
};

export const FindAllCompanyUseCaseProvider = {
  provide: FindAllCompanyUseCase,
  useFactory: (companyRepository: MongooseCompanyRepository) =>
    new FindAllCompanyUseCase(companyRepository),
  inject: [MongooseCompanyRepository],
};

export const SearchByNameUseCaseProvider = {
  provide: SearchByNameUseCase,
  useFactory: (companyRepository: MongooseCompanyRepository) =>
    new SearchByNameUseCase(companyRepository),
  inject: [MongooseCompanyRepository],
};

export default [
  CreateCompanyUseCaseProvider,
  RemoveCompanyUseCaseProvider,
  UpdateCompanyUseCaseProvider,
  FindOneCompanyUseCaseProvider,
  FindAllCompanyUseCaseProvider,
  SearchByNameUseCaseProvider,
];
