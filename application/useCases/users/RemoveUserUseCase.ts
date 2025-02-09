import UserNotFoundError from "@app/domain/errors/users/UserNotFoundError";
import SequelizeUserRepository from "@app/sequelize/repositories/User";

export default class RemoveUserUseCase {
    
    public constructor(
        private readonly userRepository: SequelizeUserRepository,
    ) {}

    public async execute(id: string): Promise<number> {

        const deletedResult: number | UserNotFoundError = await this.userRepository.remove(id);

        if(deletedResult instanceof UserNotFoundError) {
            throw new UserNotFoundError();
        }

        return deletedResult;
    }
}
