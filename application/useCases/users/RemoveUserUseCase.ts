import UserNotFoundError from "@app/domain/errors/users/UserNotFoundError";
import UsersRepository from "@app/domain/repositories/UsersRepository";

export default class RemoveUserUseCase {
  public constructor(
    private readonly userRepository: UsersRepository,
  ) {}

  public async execute(id: string): Promise<number> {
    const deletedResult: number | UserNotFoundError =
      await this.userRepository.remove(id);

    if (deletedResult instanceof UserNotFoundError) {
      throw new UserNotFoundError();
    }

    return deletedResult;
  }
}
