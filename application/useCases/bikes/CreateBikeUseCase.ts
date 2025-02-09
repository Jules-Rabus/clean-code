import SequelizeBikeRepository from "@app/sequelize/repositories/Bike";
import Bike from "@app/domain/entities/Bike";

export default class CreateBikeUseCase {
  public constructor(
    private readonly bikeRepository: SequelizeBikeRepository,
  ) {}

  public async execute(bike: Bike): Promise<Bike> {
    return this.bikeRepository.create(bike);
  }
}
