import SequelizePartRepository from "@app/sequelize/repositories/Part";
import Part from "@app/domain/entities/Part";

export default class FindOnePartUseCase {
    
    public constructor(
        private readonly partRepository: SequelizePartRepository,
    ) {}

    public async execute(id: string): Promise<Part | null> {
        return this.partRepository.findOne(id);
    }
}