import SequelizePartRepository from "@app/sequelize/repositories/Part";
import Part from "@app/domain/entities/Part";

export default class UpdatePartUseCase {
    
    public constructor(
        private readonly partRepository: SequelizePartRepository,
    ) {}

    public async execute(id: string, part: Partial<Part>): Promise<Part | null> {
        return this.partRepository.update(id, part);
    }
}