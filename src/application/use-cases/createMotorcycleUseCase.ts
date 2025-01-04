import { IMotorcycleRepository } from "../../domain/interfaces/IMotorcycleRepository";
import { Motorcycle } from "../../domain/entities/Motorcycle";
import { MotorcycleProps } from "../../domain/entities/Motorcycle";

export class CreateMotorcycleUseCase {
  constructor(private motorcycleRepository: IMotorcycleRepository) {}

  async execute(motorcycleProps: MotorcycleProps): Promise<Motorcycle> {
    const motorcycle = new Motorcycle(motorcycleProps);
    return this.motorcycleRepository.create(motorcycle);
  }
}
