import SequelizeBikeRepository from "@app/sequelize/repositories/Bike";
import Bike from "@app/domain/entities/Bike";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";
import BikeNotFoundError from "@app/domain/errors/bikes/BikeNotFoundError";

export default class FindAllBikeUseCase {
  public constructor(
    private readonly bikeRepository: SequelizeBikeRepository,
  ) {}

  public async execute(vin: VinIdentifier, bike: Partial<Bike>): Promise<Bike> {
    const updatedBike = await this.bikeRepository.update(vin, bike);

    if (updatedBike instanceof BikeNotFoundError) {
      throw new BikeNotFoundError();
    }

    return updatedBike;
  }
}
