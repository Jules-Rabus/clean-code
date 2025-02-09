import { Injectable, UnauthorizedException } from "@nestjs/common";
import LoginUseCase from "@app/application/useCases/LoginUseCase";

@Injectable()
export class AuthService {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async signIn(email: string, password: string): Promise<string> {
    try {
      return await this.loginUseCase.execute(email, password);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
