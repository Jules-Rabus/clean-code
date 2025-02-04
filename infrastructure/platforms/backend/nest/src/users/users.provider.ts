import CreateUserUseCase from '@app/application/useCases/users/CreateUserUseCase';
import RemoveUserUseCase from '@app/application/useCases/users/RemoveUserUseCase';
import UpdateUserUseCase from '@app/application/useCases/users/UpdateUserUseCase';
import FindOneUserUseCase from '@app/application/useCases/users/FindOneUserUseCase';
import FindAllUserUseCase from '@app/application/useCases/users/FindAllUserUseCase';
import SearchByEmailUserUseCase from '@app/application/useCases/users/SearchByEmailUseCase';

import SequelizeUserRepository from '@app/sequelize/repositories/User';

export const CreateBikeUseCaseProvider = {
  provide: CreateUserUseCase,
  useFactory: (userRepository: SequelizeUserRepository) => new CreateUserUseCase(userRepository),
  inject: [SequelizeUserRepository],
};

export const RemoveBikeUseCaseProvider = {
  provide: RemoveUserUseCase,
  useFactory: (userRepository: SequelizeUserRepository) => new RemoveUserUseCase(userRepository),
  inject: [SequelizeUserRepository],
};

export const UpdateBikeUseCaseProvider = {
  provide: UpdateUserUseCase,
  useFactory: (userRepository: SequelizeUserRepository) => new UpdateUserUseCase(userRepository),
  inject: [SequelizeUserRepository],
};

export const FindOneBikeUseCaseProvider = {
  provide: FindOneUserUseCase,
  useFactory: (userRepository: SequelizeUserRepository) => new FindOneUserUseCase(userRepository),
  inject: [SequelizeUserRepository],
};

export const FindAllBikeUseCaseProvider = {
  provide: FindAllUserUseCase,
  useFactory: (userRepository: SequelizeUserRepository) => new FindAllUserUseCase(userRepository),
  inject: [SequelizeUserRepository],
};

export const SearchByEmailUserUseCaseProvider = {
  provide: SearchByEmailUserUseCase,
  useFactory: (userRepository: SequelizeUserRepository) => new SearchByEmailUserUseCase(userRepository),
  inject: [SequelizeUserRepository],
};

export default [
  CreateBikeUseCaseProvider,
  RemoveBikeUseCaseProvider,
  UpdateBikeUseCaseProvider,
  FindOneBikeUseCaseProvider,
  FindAllBikeUseCaseProvider,
  SearchByEmailUserUseCaseProvider,
];
