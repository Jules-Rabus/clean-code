import Trip from "../entities/Trip";
import TripNotFoundError from "../errors/trips/TripNotFoundError";

export default interface TripsRepository {
  create(trip: Trip): Promise<Trip>;
  update(
    identifier: string,
    trip: Partial<Trip>,
  ): Promise<Trip | TripNotFoundError>;
  remove(identifier: string): Promise<number | TripNotFoundError>;
  findOne(identifier: string): Promise<Trip | TripNotFoundError>;
  findAll(): Promise<Trip[]>;
}
