import SequelizeUserRepository from "@app/sequelize/repositories/User";
import User from "@app/domain/entities/User";

export default class CreateBikeUseCase {
    
    public constructor(
        private readonly userRepository: SequelizeUserRepository,
    ) {}

    public async execute(user: User): Promise<User> {

    
        return this.userRepository.create(user);
    }
}