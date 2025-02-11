import UnexpectedError from "@app/domain/errors/UnexpectedError";
import PasswordService from "@app/application/services/PasswordService";
import UserNotFoundError from "@app/domain/errors/users/UserNotFoundError";
import AuthenticationService from "@app/application/services/AuthenticationService";
import UsersRepository from "@app/domain/repositories/UsersRepository";

export default class LoginUseCase {
  public constructor(
    private readonly passwordService: PasswordService,
    private readonly authenticationService: AuthenticationService,
    private readonly userRepository: UsersRepository,
  ) {}

  public async execute(email: string, password: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (user instanceof UserNotFoundError) throw new UserNotFoundError();

      const passwordValid = await this.passwordService.verifyPassword(
        password,
        user.password,
      );
      if (!passwordValid) throw new UserNotFoundError();

      return await this.authenticationService.createAuthenticationToken(
        user.identifier,
      );
    } catch (error) {
      throw new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
