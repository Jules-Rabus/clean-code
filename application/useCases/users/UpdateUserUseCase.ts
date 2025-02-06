import SequelizeUserRepository from "@app/sequelize/repositories/User";
import User from "@app/domain/entities/User";
import PasswordService from "../../services/PasswordService";

export default class UpdateUserUseCase {
    
    public constructor(
        private readonly userRepository: SequelizeUserRepository,
        private readonly passwordService: PasswordService,
    ) {}

    public async execute(identifier: string, user: Partial<User>): Promise<User | null> {
        
        if(user.password) {
            user.password = await this.passwordService.hashPassword(user.password);
        }
        
        return this.userRepository.update(identifier, user);
    }
}