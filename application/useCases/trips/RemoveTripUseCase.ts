import SequelizeTripRepository from "@app/sequelize/repositories/Trip";
import Trip from "@app/domain/entities/Trip";
import TripNotFoundError from "@app/domain/errors/trips/TripNotFoundError";

export default class RemoveTripUseCase {
  public constructor(
    private readonly tripRepository: SequelizeTripRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const trip = await this.tripRepository.findOne(id);

    if (trip instanceof TripNotFoundError) {
      throw new TripNotFoundError();
    }

    await this.tripRepository.remove(id);
  }
}
