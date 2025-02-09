import CreateMaintenanceUseCase from "@app/application/useCases/maintenances/CreateMaintenanceUseCase";
import RemoveMaintenanceUseCase from "@app/application/useCases/maintenances/RemoveMaintenanceUseCase";
import UpdateMaintenanceUseCase from "@app/application/useCases/maintenances/UpdateMaintenanceUseCase";
import FindOneMaintenanceUseCase from "@app/application/useCases/maintenances/FindOneMaintenanceUseCase";
import FindAllMaintenanceUseCase from "@app/application/useCases/maintenances/FindAllMaintenanceUseCase";
import SearchByBikeUseCase from "@app/application/useCases/maintenances/SearchByBikeUseCase";

import SequelizeMaintenanceRepository from "@app/sequelize/repositories/Maintenance";

const CreateMaintenanceUseCaseProvider = {
  provide: CreateMaintenanceUseCase,
  useFactory: (maintenanceRepository: SequelizeMaintenanceRepository) =>
    new CreateMaintenanceUseCase(maintenanceRepository),
  inject: [SequelizeMaintenanceRepository],
};

const RemoveMaintenanceUseCaseProvider = {
  provide: RemoveMaintenanceUseCase,
  useFactory: (maintenanceRepository: SequelizeMaintenanceRepository) =>
    new RemoveMaintenanceUseCase(maintenanceRepository),
  inject: [SequelizeMaintenanceRepository],
};

const UpdateMaintenanceUseCaseProvider = {
  provide: UpdateMaintenanceUseCase,
  useFactory: (maintenanceRepository: SequelizeMaintenanceRepository) =>
    new UpdateMaintenanceUseCase(maintenanceRepository),
  inject: [SequelizeMaintenanceRepository],
};

const FindOneMaintenanceUseCaseProvider = {
  provide: FindOneMaintenanceUseCase,
  useFactory: (maintenanceRepository: SequelizeMaintenanceRepository) =>
    new FindOneMaintenanceUseCase(maintenanceRepository),
  inject: [SequelizeMaintenanceRepository],
};

const FindAllMaintenanceUseCaseProvider = {
  provide: FindAllMaintenanceUseCase,
  useFactory: (maintenanceRepository: SequelizeMaintenanceRepository) =>
    new FindAllMaintenanceUseCase(maintenanceRepository),
  inject: [SequelizeMaintenanceRepository],
};

const SearchByBikeUseCaseProvider = {
  provide: SearchByBikeUseCase,
  useFactory: (maintenanceRepository: SequelizeMaintenanceRepository) =>
    new SearchByBikeUseCase(maintenanceRepository),
  inject: [SequelizeMaintenanceRepository],
};

export default [
  CreateMaintenanceUseCaseProvider,
  RemoveMaintenanceUseCaseProvider,
  UpdateMaintenanceUseCaseProvider,
  FindOneMaintenanceUseCaseProvider,
  FindAllMaintenanceUseCaseProvider,
  SearchByBikeUseCaseProvider,
];
