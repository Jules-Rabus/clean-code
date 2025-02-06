import SequelizePartRepository from "@app/sequelize/repositories/Part";
import Part from "@app/domain/entities/Part";

export default class FindAllPartUseCase {
    
    public constructor(
        private readonly partRepository: SequelizePartRepository,
    ) {}

    public async execute(): Promise<Part[]> {
        return this.partRepository.findAll();
    }
}