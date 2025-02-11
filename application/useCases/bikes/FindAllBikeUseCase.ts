import BikesRepository from "@app/domain/repositories/BikesRepository";
import Bike from "@app/domain/entities/Bike";

export default class FindAllBikeUseCase {
  public constructor(
    private readonly bikeRepository: BikesRepository,
  ) {}

  public async execute(): Promise<Bike[]> {
    return this.bikeRepository.findAll();
  }
}
