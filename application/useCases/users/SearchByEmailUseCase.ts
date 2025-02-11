import UsersRepository from "@app/domain/repositories/UsersRepository";
import User from "@app/domain/entities/User";

export default class SearchByMailUseCase {
  public constructor(
    private readonly userRepository: UsersRepository,
  ) {}

  public async execute(email: string): Promise<User[]> {
    return this.userRepository.searchByEmail(email);
  }
}
