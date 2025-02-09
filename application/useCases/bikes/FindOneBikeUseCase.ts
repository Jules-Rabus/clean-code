import SequelizeBikeRepository from "@app/sequelize/repositories/Bike";
import Bike from "@app/domain/entities/Bike";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";
import BikeNotFoundError from "@app/domain/errors/bikes/BikeNotFoundError";

export default class FindOneBikeUseCase {
    
    public constructor(
        private readonly bikeRepository: SequelizeBikeRepository,
    ) {}

    public async execute(vin: VinIdentifier): Promise<Bike> {
        const bike = await this.bikeRepository.findOne(vin);

        if (bike instanceof BikeNotFoundError) {
            throw new BikeNotFoundError();
        }

        return bike;
    }
}