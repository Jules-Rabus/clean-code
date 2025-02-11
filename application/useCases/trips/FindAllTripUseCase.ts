import TripsRepository from "@app/domain/repositories/TripsRepository";
import Trip from "@app/domain/entities/Trip";

export default class FindAllTripUseCase {
  public constructor(
    private readonly tripRepository: TripsRepository,
  ) {}

  public async execute(): Promise<Trip[]> {
    return await this.tripRepository.findAll();
  }
}
