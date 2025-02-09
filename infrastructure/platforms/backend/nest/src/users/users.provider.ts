import CreateUserUseCase from "@app/application/useCases/users/CreateUserUseCase";
import RemoveUserUseCase from "@app/application/useCases/users/RemoveUserUseCase";
import UpdateUserUseCase from "@app/application/useCases/users/UpdateUserUseCase";
import FindOneUserUseCase from "@app/application/useCases/users/FindOneUserUseCase";
import FindAllUserUseCase from "@app/application/useCases/users/FindAllUserUseCase";
import SearchByEmailUserUseCase from "@app/application/useCases/users/SearchByEmailUseCase";

import PasswordService from "@app/application/services/PasswordService";
import SequelizeUserRepository from "@app/sequelize/repositories/User";

export const CreateUserUseCaseProvider = {
  provide: CreateUserUseCase,
  useFactory: (
    userRepository: SequelizeUserRepository,
    passwordService: PasswordService,
  ) => new CreateUserUseCase(userRepository, passwordService),
  inject: [SequelizeUserRepository, PasswordService],
};

export const RemoveUserUseCaseProvider = {
  provide: RemoveUserUseCase,
  useFactory: (userRepository: SequelizeUserRepository) =>
    new RemoveUserUseCase(userRepository),
  inject: [SequelizeUserRepository],
};

export const UpdateUserUseCaseProvider = {
  provide: UpdateUserUseCase,
  useFactory: (
    userRepository: SequelizeUserRepository,
    passwordService: PasswordService,
  ) => new UpdateUserUseCase(userRepository, passwordService),
  inject: [SequelizeUserRepository, PasswordService],
};

export const FindOneUserUseCaseProvider = {
  provide: FindOneUserUseCase,
  useFactory: (userRepository: SequelizeUserRepository) =>
    new FindOneUserUseCase(userRepository),
  inject: [SequelizeUserRepository],
};

export const FindAllUserUseCaseProvider = {
  provide: FindAllUserUseCase,
  useFactory: (userRepository: SequelizeUserRepository) =>
    new FindAllUserUseCase(userRepository),
  inject: [SequelizeUserRepository],
};

export const SearchByEmailUserUseCaseProvider = {
  provide: SearchByEmailUserUseCase,
  useFactory: (userRepository: SequelizeUserRepository) =>
    new SearchByEmailUserUseCase(userRepository),
  inject: [SequelizeUserRepository],
};

export default [
  CreateUserUseCaseProvider,
  RemoveUserUseCaseProvider,
  UpdateUserUseCaseProvider,
  FindOneUserUseCaseProvider,
  FindAllUserUseCaseProvider,
  SearchByEmailUserUseCaseProvider,
  PasswordService,
];
