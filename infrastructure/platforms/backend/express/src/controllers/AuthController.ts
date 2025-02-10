import { Request, Response } from "express";
import LoginUseCase from "@app/application/useCases/LoginUseCase";
import PasswordService from "@app/application/services/PasswordService";
import AuthenticationService from "@app/application/services/AuthenticationService";
import SequelizeUserRepository from "@app/sequelize/repositories/User";
import AuthVerifyUseCase from "@app/application/useCases/AuthVerifyUseCase";

  
export class AuthController {

    private loginUseCase: LoginUseCase;
    private authVerifyUseCase: AuthVerifyUseCase;
    
    constructor() {
        const passwordService = new PasswordService();
        const authenticationService = new AuthenticationService();
        const userRepository = new SequelizeUserRepository();
        this.loginUseCase = new LoginUseCase(passwordService, authenticationService, userRepository);
        this.authVerifyUseCase = new AuthVerifyUseCase(authenticationService, userRepository);
    }

    async signIn(req: Request, res: Response) {
      try {
        const { email, password } = req.body;
        const token = await this.loginUseCase.execute(email, password);
        res.json(token);
      } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
      }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const token = this.extractTokenFromHeader(req);

            if(!token) throw new Error("Unauthorized");

            const user = await this.authVerifyUseCase.execute(token);
            res.json(user);
        } catch (error) {
            res.status(401).json({ error: "Unauthorized" });
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
  