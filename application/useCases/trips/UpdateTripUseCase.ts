import TripsRepository from "@app/domain/repositories/TripsRepository";
import Trip from "@app/domain/entities/Trip";
import TripNotFoundError from "@app/domain/errors/trips/TripNotFoundError";

export default class UpdateTripUseCase {
  public constructor(
    private readonly tripRepository: TripsRepository,
  ) {}

  public async execute(id: string, trip: Partial<Trip>): Promise<Trip> {
    const updatedTrip = await this.tripRepository.update(id, trip);

    if (updatedTrip instanceof TripNotFoundError) {
      throw new TripNotFoundError();
    }

    return updatedTrip;
  }
}
