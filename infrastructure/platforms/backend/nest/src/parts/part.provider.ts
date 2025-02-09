import CreatePartUseCase from "@app/application/useCases/parts/CreatePartUseCase";
import RemovePartUseCase from "@app/application/useCases/parts/RemovePartUseCase";
import UpdatePartUseCase from "@app/application/useCases/parts/UpdatePartUseCase";
import FindOnePartUseCase from "@app/application/useCases/parts/FindOnePartUseCase";
import FindAllPartUseCase from "@app/application/useCases/parts/FindAllPartUseCase";
import SearchByReferenceUseCase from "@app/application/useCases/parts/SearchByReferenceUseCase";

import SequelizePartRepository from "@app/sequelize/repositories/Part";

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
  useFactory: (PartRepository: SequelizePartRepository) =>
    new UpdatePartUseCase(PartRepository),
  inject: [SequelizePartRepository],
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

export default [
  CreatePartUseCaseProvider,
  RemovePartUseCaseProvider,
  UpdatePartUseCaseProvider,
  FindOnePartUseCaseProvider,
  FindAllPartUseCaseProvider,
  SearchByReferenceUseCaseProvider,
];
