import bcrypt from 'bcrypt';
import { PasswordHashError } from '@app/domain/errors/PasswordHashError';
import { PasswordTooShortError } from "@app/domain/errors/PasswordTooShortError";
import { PasswordDoesNotIncludeLowercaseLetterError } from "@app/domain/errors/PasswordDoesNotIncludeLowercaseLetterError";
import { PasswordDoesNotIncludeNumberError } from "@app/domain/errors/PasswordDoesNotIncludeNumberError";
import { PasswordDoesNotIncludeSymbolError } from "@app/domain/errors/PasswordDoesNotIncludeSymbolError";
import { PasswordDoesNotIncludeUppercaseLetterError } from "@app/domain/errors/PasswordDoesNotIncludeUppercaseLetterError";

export interface PasswordServiceInterface {
  hashPassword: (plainPassword: string) => Promise<string>;
  verifyPassword: (plainPassword: string, hashedPassword: string) => Promise<boolean>;
}

export default class PasswordService implements PasswordServiceInterface {

  private readonly saltRounds: number = parseInt(process.env["PASSWORD_SALT_ROUNDS"] || "10");


  private validatePassword(value: string): void {
    if (value.length < 8) {
      throw new PasswordTooShortError();
    }
    if (!/(?=\d)/.test(value)) {
      throw new PasswordDoesNotIncludeNumberError();
    }
    if (!/(?=[a-z])/.test(value)) {
      throw new PasswordDoesNotIncludeLowercaseLetterError();
    }
    if (!/(?=[A-Z])/.test(value)) {
      throw new PasswordDoesNotIncludeUppercaseLetterError();
    }
    if (!/(?=[^a-zA-Z0-9])/.test(value)) {
      throw new PasswordDoesNotIncludeSymbolError();
    }
  }

  async hashPassword(plainPassword: string): Promise<string> {
    this.validatePassword(plainPassword);
    try {
      const hashedPassword = await bcrypt.hash(plainPassword, this.saltRounds);
      return hashedPassword;
    } catch (error) {
        throw new PasswordHashError(error instanceof Error ? error.message : String(error));
    }
  }

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
