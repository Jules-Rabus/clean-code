import SequelizeTripRepository from "@app/sequelize/repositories/Trip";
import Trip from "@app/domain/entities/Trip";

export default class CreateTripUseCase {
  public constructor(
    private readonly tripRepository: SequelizeTripRepository,
  ) {}

  public async execute(trip: Trip): Promise<Trip> {
    return this.tripRepository.create(trip);
  }
}