import SequelizeTripRepository from "@app/sequelize/repositories/Trip";
import Trip from "@app/domain/entities/Trip";

export default class FindAllTripUseCase {
  public constructor(
    private readonly tripRepository: SequelizeTripRepository,
  ) {}

  public async execute(): Promise<Trip[]> {
    return await this.tripRepository.findAll();
  }
}