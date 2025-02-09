import CreateAlertUseCase from "@app/application/useCases/alerts/CreateAlertUseCase";
import UpdateAlertUseCase from "@app/application/useCases/alerts/UpdateAlertUseCase";
import FindOneAlertUseCase from "@app/application/useCases/alerts/FindOneAlertUseCase";
import FindAllAlertUseCase from "@app/application/useCases/alerts/FindAllAlertUseCase";

import MongooseAlertRepository from "@app/mongoose/repositories/Alert";

export const CreateAlertUseCaseProvider = {
  provide: CreateAlertUseCase,
  useFactory: (alertRepository: MongooseAlertRepository) =>
    new CreateAlertUseCase(alertRepository),
  inject: [MongooseAlertRepository],
};

export const UpdateAlertUseCaseProvider = {
  provide: UpdateAlertUseCase,
  useFactory: (alertRepository: MongooseAlertRepository) =>
    new UpdateAlertUseCase(alertRepository),
  inject: [MongooseAlertRepository],
};

export const FindOneAlertUseCaseProvider = {
  provide: FindOneAlertUseCase,
  useFactory: (alertRepository: MongooseAlertRepository) =>
    new FindOneAlertUseCase(alertRepository),
  inject: [MongooseAlertRepository],
};

export const FindAllAlertUseCaseProvider = {
  provide: FindAllAlertUseCase,
  useFactory: (alertRepository: MongooseAlertRepository) =>
    new FindAllAlertUseCase(alertRepository),
  inject: [MongooseAlertRepository],
};

export default [
  CreateAlertUseCaseProvider,
  UpdateAlertUseCaseProvider,
  FindOneAlertUseCaseProvider,
  FindAllAlertUseCaseProvider,
];
