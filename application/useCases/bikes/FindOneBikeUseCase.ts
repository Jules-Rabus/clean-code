import SequelizeBikeRepository from "@app/sequelize/repositories/Bike";
import Bike from "@app/domain/entities/Bike";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";

export default class FindOneBikeUseCase {
    
    public constructor(
        private readonly bikeRepository: SequelizeBikeRepository,
    ) {}

    public async execute(vin: VinIdentifier): Promise<Bike | null> {
        return this.bikeRepository.findOne(vin);
    }
}