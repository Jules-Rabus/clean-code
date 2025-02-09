import SequelizePartRepository from "@app/sequelize/repositories/Part";
import Part from "@app/domain/entities/Part";
import PartNotFoundError from "@app/domain/errors/parts/PartNotFoundError";

export default class UpdatePartUseCase {
    
    public constructor(
        private readonly partRepository: SequelizePartRepository,
    ) {}

    public async execute(id: string, part: Partial<Part>): Promise<Part> {
        
        const updatedPart = await this.partRepository.update(id, part);

        if(updatedPart instanceof PartNotFoundError) {
            throw new PartNotFoundError();
        }
        
        return updatedPart;
    }
}