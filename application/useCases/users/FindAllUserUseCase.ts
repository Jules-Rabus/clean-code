import SequelizeUserRepository from "@app/sequelize/repositories/User";
import User from "@app/domain/entities/User";

export default class FindAllUserUserCase {
  public constructor(
    private readonly userRepository: SequelizeUserRepository,
  ) {}

  public async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
