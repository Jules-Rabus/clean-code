import Bike from "@app/domain/entities/Bike";
import BikesRepository from "@app/domain/repositories/BikesRepository";

export default class CreateBikeUseCase {
  public constructor(
    private readonly bikeRepository: BikesRepository,
  ) {}

  public async execute(bike: Bike): Promise<Bike> {
    return this.bikeRepository.create(bike);
  }
}
