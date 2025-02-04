import SequelizeUserRepository from "@app/sequelize/repositories/User";
import User from "@app/domain/entities/User";

export default class FindByEmailUseCase {
    
    public constructor(
        private readonly userRepository: SequelizeUserRepository,
    ) {}

    public async execute(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }
}