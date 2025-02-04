import { UnauthorizedError } from "@app/domain/errors/UnauthorizedError";
import { TokenGenerationError } from "@app/domain/errors/TokenGenerationError";
import * as jwt from "jsonwebtoken";

export interface AuthenticationServiceInterface {
  readonly createAuthenticationToken: (userIdentifier: string) => Promise<string>;
  readonly verifyAuthenticationToken: (authenticationToken: string) => Promise<string | UnauthorizedError>;
}

export default class AuthenticationService implements AuthenticationServiceInterface {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: number;

  constructor() {
    this.jwtSecret = process.env["JWT_SECRET"] || "secret";
    this.jwtExpiresIn = parseInt(process.env["JWT_EXPIRES_IN"] || "3600");
  }

  async createAuthenticationToken(userIdentifier: string): Promise<string> {
    try {
      const payload = { id: userIdentifier };
      const options: jwt.SignOptions = { expiresIn: this.jwtExpiresIn };
      const token = jwt.sign(payload, this.jwtSecret, options);
      return token;
    } catch (error) {
        throw new TokenGenerationError();
    }
  }

  async verifyAuthenticationToken(authenticationToken: string): Promise<string | UnauthorizedError> {
    try {
      const decoded = jwt.verify(authenticationToken, this.jwtSecret) as jwt.JwtPayload;
      
      if (!decoded || !decoded["id"]) {
        return new UnauthorizedError();
      }

      return decoded["id"];
    } catch (error) {
      return new UnauthorizedError();
    }
  }
}
