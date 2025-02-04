import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUseCase } from '@app/application/useCases/LoginUseCase';
import { UserNotFoundError } from '@app/domain/errors/UserNotFoundError';
import { UnexpectedError } from '@app/domain/errors/UnexpectedError';

@Injectable()
export class AuthService {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async signIn(email: string, password: string): Promise<string> {
    try {
        return await this.loginUseCase.execute(email, password);
    }
    catch (error) {
        console.log(error);
        throw new UnauthorizedException();
    }
  }
}
