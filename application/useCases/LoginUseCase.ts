import { UnexpectedError } from "@app/domain/errors/UnexpectedError";
import PasswordService from "@app/application/services/PasswordService";
import { UserNotFoundError } from "@app/domain/errors/UserNotFoundError";
import AuthenticationService from "@app/application/services/AuthenticationService";
import SequelizeUserRepository from "@app/sequelize/repositories/User";
import User from "@app/domain/entities/User";

export class LoginUseCase {

    public constructor(
      private readonly passwordService: PasswordService,
      private readonly authenticationService: AuthenticationService,
      private readonly userRepository: SequelizeUserRepository,
    ) {}

  public async execute(
    email: string,
    password: string
  ) {

    try {

      const user : User | null = await this.userRepository.findByEmail(email);
      if (!user) throw new UserNotFoundError;

      const passwordValid = await this.passwordService.verifyPassword(password, user.password);
      if (!passwordValid) throw new UserNotFoundError;

      return await this.authenticationService.createAuthenticationToken(user.identifier);

    } catch (error) {
      throw new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}