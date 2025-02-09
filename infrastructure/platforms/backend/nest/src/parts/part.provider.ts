import CreatePartUseCase from "@app/application/useCases/parts/CreatePartUseCase";
import RemovePartUseCase from "@app/application/useCases/parts/RemovePartUseCase";
import UpdatePartUseCase from "@app/application/useCases/parts/UpdatePartUseCase";
import FindOnePartUseCase from "@app/application/useCases/parts/FindOnePartUseCase";
import FindAllPartUseCase from "@app/application/useCases/parts/FindAllPartUseCase";
import SearchByReferenceUseCase from "@app/application/useCases/parts/SearchByReferenceUseCase";

import CreateAlertUseCase from "@app/application/useCases/alerts/CreateAlertUseCase";

import SequelizePartRepository from "@app/sequelize/repositories/Part";
import MongooseAlertRepository from "@app/mongoose/repositories/Alert";

export const CreatePartUseCaseProvider = {
  provide: CreatePartUseCase,
  useFactory: (PartRepository: SequelizePartRepository) =>
    new CreatePartUseCase(PartRepository),
  inject: [SequelizePartRepository],
};

export const RemovePartUseCaseProvider = {
  provide: RemovePartUseCase,
  useFactory: (PartRepository: SequelizePartRepository) =>
    new RemovePartUseCase(PartRepository),
  inject: [SequelizePartRepository],
};

export const UpdatePartUseCaseProvider = {
  provide: UpdatePartUseCase,
  useFactory: (
    PartRepository: SequelizePartRepository,
    CreateAlertUseCase: CreateAlertUseCase,
  ) => new UpdatePartUseCase(PartRepository, CreateAlertUseCase),
  inject: [SequelizePartRepository, CreateAlertUseCase],
};

export const FindOnePartUseCaseProvider = {
  provide: FindOnePartUseCase,
  useFactory: (PartRepository: SequelizePartRepository) =>
    new FindOnePartUseCase(PartRepository),
  inject: [SequelizePartRepository],
};

export const FindAllPartUseCaseProvider = {
  provide: FindAllPartUseCase,
  useFactory: (PartRepository: SequelizePartRepository) =>
    new FindAllPartUseCase(PartRepository),
  inject: [SequelizePartRepository],
};

export const SearchByReferenceUseCaseProvider = {
  provide: SearchByReferenceUseCase,
  useFactory: (PartRepository: SequelizePartRepository) =>
    new SearchByReferenceUseCase(PartRepository),
  inject: [SequelizePartRepository],
};

export const CreateAlertUseCaseProvider = {
  provide: CreateAlertUseCase,
  useFactory: (alertRepository: MongooseAlertRepository) =>
    new CreateAlertUseCase(alertRepository),
  inject: [MongooseAlertRepository],
};

export default [
  CreatePartUseCaseProvider,
  RemovePartUseCaseProvider,
  UpdatePartUseCaseProvider,
  FindOnePartUseCaseProvider,
  FindAllPartUseCaseProvider,
  SearchByReferenceUseCaseProvider,
  CreateAlertUseCaseProvider,
  MongooseAlertRepository,
];
