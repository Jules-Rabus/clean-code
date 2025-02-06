import SequelizePartRepository from "@app/sequelize/repositories/Part";
import Part from "@app/domain/entities/Part";

export default class CreatePartUseCase {
        
    public constructor(
        private readonly partRepository: SequelizePartRepository,
    ) {}

    public async execute(part: Part): Promise<Part> {
        return this.partRepository.create(part);
    }
}
