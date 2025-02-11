import BikesRepository from "@app/domain/repositories/BikesRepository";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";
import BikeNotFoundError from "@app/domain/errors/bikes/BikeNotFoundError";

export default class RemoveBikeUseCase {
  public constructor(
    private readonly bikeRepository: BikesRepository,
  ) {}

  public async execute(vin: VinIdentifier): Promise<number> {
    const deletedBike = await this.bikeRepository.remove(vin);

    if (deletedBike instanceof BikeNotFoundError) {
      throw new BikeNotFoundError();
    }

    return deletedBike;
  }
}
