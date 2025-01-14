import SequelizeBikeRepository from "@app/sequelize/repositories/Bike";
import Bike from "@app/domain/entities/Bike";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";

export default class FindAllBikeUseCase {
    
    public constructor(
        private readonly bikeRepository: SequelizeBikeRepository,
    ) {}

    public async execute(vin: VinIdentifier, bike: Partial<Bike>): Promise<Bike | null> {

        // @TODO: Add validation logic here

        return this.bikeRepository.update(vin, bike);
    }
}