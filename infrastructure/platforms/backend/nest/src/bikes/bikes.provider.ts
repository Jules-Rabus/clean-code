import CreateBikeUseCase from '@app/application/useCases/bikes/CreateBikeUseCase';
import RemoveBikeUseCase from '@app/application/useCases/bikes/RemoveBikeUseCase';
import UpdateBikeUseCase from '@app/application/useCases/bikes/UpdateBikeUseCase';
import FindOneBikeUseCase from '@app/application/useCases/bikes/FindOneBikeUseCase';
import FindAllBikeUseCase from '@app/application/useCases/bikes/FindAllBikeUseCase';

import SequelizeBikeRepository from '@app/sequelize/repositories/Bike';

export const CreateBikeUseCaseProvider = {
  provide: CreateBikeUseCase,
  useFactory: (bikeRepository: SequelizeBikeRepository) => new CreateBikeUseCase(bikeRepository),
  inject: [SequelizeBikeRepository],
};

export const RemoveBikeUseCaseProvider = {
  provide: RemoveBikeUseCase,
  useFactory: (bikeRepository: SequelizeBikeRepository) => new RemoveBikeUseCase(bikeRepository),
  inject: [SequelizeBikeRepository],
};

export const UpdateBikeUseCaseProvider = {
  provide: UpdateBikeUseCase,
  useFactory: (bikeRepository: SequelizeBikeRepository) => new UpdateBikeUseCase(bikeRepository),
  inject: [SequelizeBikeRepository],
};

export const FindOneBikeUseCaseProvider = {
  provide: FindOneBikeUseCase,
  useFactory: (bikeRepository: SequelizeBikeRepository) => new FindOneBikeUseCase(bikeRepository),
  inject: [SequelizeBikeRepository],
};

export const FindAllBikeUseCaseProvider = {
  provide: FindAllBikeUseCase,
  useFactory: (bikeRepository: SequelizeBikeRepository) => new FindAllBikeUseCase(bikeRepository),
  inject: [SequelizeBikeRepository],
};

export default [
  CreateBikeUseCaseProvider,
  RemoveBikeUseCaseProvider,
  UpdateBikeUseCaseProvider,
  FindOneBikeUseCaseProvider,
  FindAllBikeUseCaseProvider,
];
