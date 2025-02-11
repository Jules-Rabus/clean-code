import BikesRepository from "@app/domain/repositories/BikesRepository";
import Bike from "@app/domain/entities/Bike";

export default class SearchByModelUseCase {
  public constructor(
    private readonly bikeRepository: BikesRepository,
  ) {}

  public async execute(model: string): Promise<Bike[]> {
    return this.bikeRepository.searchByModel(model);
  }
}
