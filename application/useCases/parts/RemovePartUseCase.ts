import SequelizePartRepository from "@app/sequelize/repositories/Part";

export default class RemovePartUseCase {
        
    public constructor(
        private readonly partRepository: SequelizePartRepository,
    ) {}

    public async execute(identifier: string): Promise<void> {
        return this.partRepository.remove(identifier);
    }
}