import UserNotFoundError from "@app/domain/errors/users/UserNotFoundError";
import AuthenticationService from "@app/application/services/AuthenticationService";
import UsersRepository from "@app/domain/repositories/UsersRepository";
import { UnauthorizedError } from "@app/domain/errors/UnauthorizedError";

export default class AuthVerifyUseCase {
  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userRepository: UsersRepository,
  ) {}

  public async execute(token: string) {
    const userId =
      await this.authenticationService.verifyAuthenticationToken(token);

    if (userId instanceof UnauthorizedError) throw UnauthorizedError;

    const user = await this.userRepository.findOne(userId);

    if (user instanceof UserNotFoundError) throw new UserNotFoundError();

    return user;
  }
}
