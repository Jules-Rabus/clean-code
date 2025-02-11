import CreateTripUseCase from "@app/application/useCases/trips/CreateTripUseCase";
import FindOneTripUseCase from "@app/application/useCases/trips/FindOneTripUseCase";
import FindAllTripUseCase from "@app/application/useCases/trips/FindAllTripUseCase";
import RemoveTripUseCase from "@app/application/useCases/trips/RemoveTripUseCase";
import UpdateTripUseCase from "@app/application/useCases/trips/UpdateTripUseCase";

import SequelizeTripRepository from "@app/sequelize/repositories/Trip";

const CreateTripUseCaseProvider = {
  provide: CreateTripUseCase,
  useFactory: (tripRepository: SequelizeTripRepository) =>
    new CreateTripUseCase(tripRepository),
  inject: [SequelizeTripRepository],
};

const FindOneTripUseCaseProvider = {
  provide: FindOneTripUseCase,
  useFactory: (tripRepository: SequelizeTripRepository) =>
    new FindOneTripUseCase(tripRepository),
  inject: [SequelizeTripRepository],
};

const FindAllTripUseCaseProvider = {
  provide: FindAllTripUseCase,
  useFactory: (tripRepository: SequelizeTripRepository) =>
    new FindAllTripUseCase(tripRepository),
  inject: [SequelizeTripRepository],
};

const RemoveTripUseCaseProvider = {
  provide: RemoveTripUseCase,
  useFactory: (tripRepository: SequelizeTripRepository) =>
    new RemoveTripUseCase(tripRepository),
  inject: [SequelizeTripRepository],
};

const UpdateTripUseCaseProvider = {
  provide: UpdateTripUseCase,
  useFactory: (tripRepository: SequelizeTripRepository) =>
    new UpdateTripUseCase(tripRepository),
  inject: [SequelizeTripRepository],
};

export default [
  CreateTripUseCaseProvider,
  FindOneTripUseCaseProvider,
  FindAllTripUseCaseProvider,
  RemoveTripUseCaseProvider,
  UpdateTripUseCaseProvider,
];
