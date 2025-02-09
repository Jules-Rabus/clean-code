import SequelizeUserRepository from "@app/sequelize/repositories/User";
import User from "@app/domain/entities/User";
import UserNotFoundError from "@app/domain/errors/users/UserNotFoundError";

export default class FindByEmailUseCase {
    
    public constructor(
        private readonly userRepository: SequelizeUserRepository,
    ) {}

    public async execute(email: string): Promise<User> {
        
        const user = await this.userRepository.findByEmail(email);

        if(user instanceof UserNotFoundError) {
            throw new UserNotFoundError();
        }

        return user;
    }
}