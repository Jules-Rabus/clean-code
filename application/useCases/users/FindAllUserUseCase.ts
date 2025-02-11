import UsersRepository from "@app/domain/repositories/UsersRepository";
import User from "@app/domain/entities/User";

export default class FindAllUserUserCase {
  public constructor(
    private readonly userRepository: UsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
