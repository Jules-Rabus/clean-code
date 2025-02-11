import BikesRepository from "@app/domain/repositories/BikesRepository";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";
import Bike from "@app/domain/entities/Bike";

export default class SearchByVinUseCase {
  public constructor(
    private readonly bikeRepository: BikesRepository,
  ) {}

  public async execute(vin: VinIdentifier): Promise<Bike[]> {
    return this.bikeRepository.searchByVin(vin);
  }
}
