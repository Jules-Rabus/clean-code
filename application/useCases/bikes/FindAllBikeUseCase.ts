import SequelizeBikeRepository from "@app/sequelize/repositories/Bike";
import Bike from "@app/domain/entities/Bike";

export default class FindAllBikeUseCase {
  public constructor(
    private readonly bikeRepository: SequelizeBikeRepository,
  ) {}

  public async execute(): Promise<Bike[]> {
    return this.bikeRepository.findAll();
  }
}
