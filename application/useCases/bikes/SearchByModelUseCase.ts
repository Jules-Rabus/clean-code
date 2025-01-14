import SequelizeBikeRepository from "@app/sequelize/repositories/Bike";
import Bike from "@app/domain/entities/Bike";

export default class SearchByModelUseCase {
    
    public constructor(
        private readonly bikeRepository: SequelizeBikeRepository,
    ) {}

    public async execute(model: string): Promise<Bike[]> {

        // @TODO: Add validation logic here

        return this.bikeRepository.searchByModel(model);
    }
}