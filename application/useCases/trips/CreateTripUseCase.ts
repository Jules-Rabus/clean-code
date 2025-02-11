import TripsRepository from "@app/domain/repositories/TripsRepository";
import Trip from "@app/domain/entities/Trip";

export default class CreateTripUseCase {
  public constructor(
    private readonly tripRepository: TripsRepository,
  ) {}

  public async execute(trip: Trip): Promise<Trip> {
    return this.tripRepository.create(trip);
  }
}
