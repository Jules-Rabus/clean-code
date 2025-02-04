import SequelizeUserRepository from "@app/sequelize/repositories/User";
import User from "@app/domain/entities/User";

export default class UpdateUserUseCase {
    
    public constructor(
        private readonly userRepository: SequelizeUserRepository,
    ) {}

    public async execute(id: string, user: Partial<User>): Promise<User | null> {
        return this.userRepository.update(id, user);
    }
}