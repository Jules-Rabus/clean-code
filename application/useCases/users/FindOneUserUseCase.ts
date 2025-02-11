import UsersRepository from "@app/domain/repositories/UsersRepository";
import User from "@app/domain/entities/User";
import UserNotFoundError from "@app/domain/errors/users/UserNotFoundError";

export default class FindOneUserUseCase {
  public constructor(
    private readonly userRepository: UsersRepository,
  ) {}

  public async execute(identifier: string): Promise<User> {
    const user = await this.userRepository.findOne(identifier);

    if (user instanceof UserNotFoundError) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
