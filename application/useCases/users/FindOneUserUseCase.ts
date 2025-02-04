import SequelizeUserRepository from "@app/sequelize/repositories/User";
import User from "@app/domain/entities/User";

export default class FindOneUserUseCase {
    
    public constructor(
        private readonly userRepository: SequelizeUserRepository,
    ) {}

    public async execute(id: string): Promise<User | null> {
        return this.userRepository.findOne(id);
    }
}