import SequelizeUserRepository from "@app/sequelize/repositories/User";
import User from "@app/domain/entities/User";
import PasswordService from "../../services/PasswordService";
import UserNotFoundError from "@app/domain/errors/users/UserNotFoundError";

export default class UpdateUserUseCase {
    
    public constructor(
        private readonly userRepository: SequelizeUserRepository,
        private readonly passwordService: PasswordService,
    ) {}

    public async execute(identifier: string, user: Partial<User>): Promise<User> {
        
        if(user.password) {
            user.password = await this.passwordService.hashPassword(user.password);
        }

        const updatedUser = await this.userRepository.update(identifier, user);
        
        if(!updatedUser || updatedUser instanceof UserNotFoundError) {
            throw new UserNotFoundError();
        }

        return updatedUser;
    }
}