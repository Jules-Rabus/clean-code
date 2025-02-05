import CreateIncidentUseCase from "@app/application/useCases/incidents/CreateIncidentUseCase";
import RemoveIncidentUseCase from "@app/application/useCases/incidents/RemoveIncidentUseCase";
import UpdateIncidentUseCase from "@app/application/useCases/incidents/UpdateIncidentUseCase";
import FindOneIncidentUseCase from "@app/application/useCases/incidents/FindOneIncidentUseCase";
import FindAllIncidentUseCase from "@app/application/useCases/incidents/FindAllIncidentUseCase";
import SearchByBikeUseCase from "@app/application/useCases/incidents/SearchByBikeUseCase";

import SequelizeIncidentRepository from "@app/sequelize/repositories/Incident";

export const CreateIncidentUseCaseProvider = {
  provide: CreateIncidentUseCase,
  useFactory: (incidentRepository: SequelizeIncidentRepository) => new CreateIncidentUseCase(incidentRepository),
  inject: [SequelizeIncidentRepository],
};

export const RemoveIncidentUseCaseProvider = {
  provide: RemoveIncidentUseCase,
  useFactory: (incidentRepository: SequelizeIncidentRepository) => new RemoveIncidentUseCase(incidentRepository),
  inject: [SequelizeIncidentRepository],
};

export const UpdateIncidentUseCaseProvider = {
  provide: UpdateIncidentUseCase,
  useFactory: (incidentRepository: SequelizeIncidentRepository) => new UpdateIncidentUseCase(incidentRepository),
  inject: [SequelizeIncidentRepository],
};

export const FindOneIncidentUseCaseProvider = {
  provide: FindOneIncidentUseCase,
  useFactory: (incidentRepository: SequelizeIncidentRepository) => new FindOneIncidentUseCase(incidentRepository),
  inject: [SequelizeIncidentRepository],
};

export const FindAllIncidentUseCaseProvider = {
  provide: FindAllIncidentUseCase,
  useFactory: (incidentRepository: SequelizeIncidentRepository) => new FindAllIncidentUseCase(incidentRepository),
  inject: [SequelizeIncidentRepository],
};

export const SearchByBikeUseCaseProvider = {
  provide: SearchByBikeUseCase,
  useFactory: (incidentRepository: SequelizeIncidentRepository) => new SearchByBikeUseCase(incidentRepository),
  inject: [SequelizeIncidentRepository],
};

export default [
  CreateIncidentUseCaseProvider,
  RemoveIncidentUseCaseProvider,
  UpdateIncidentUseCaseProvider,
  FindOneIncidentUseCaseProvider,
  FindAllIncidentUseCaseProvider,
  SearchByBikeUseCaseProvider,
];