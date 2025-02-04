import SequelizeUserRepository from "@app/sequelize/repositories/User";
import PasswordService from "@app/application/services/PasswordService";
import User from "@app/domain/entities/User";

export default class CreateUserUseCase {
    
    public constructor(
        private readonly userRepository: SequelizeUserRepository,
        private readonly passwordService: PasswordService,
    ) {}

    public async execute(user: User): Promise<User> {

        user.password = await this.passwordService.hashPassword(user.password);
    
        return this.userRepository.create(user);
    }
}