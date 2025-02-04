import SequelizeUserRepository from "@app/sequelize/repositories/User";

export default class RemoveUserUseCase {
    
    public constructor(
        private readonly userRepository: SequelizeUserRepository,
    ) {}

    public async execute(id: string): Promise<void> {
        return this.userRepository.remove(id);
    }
}