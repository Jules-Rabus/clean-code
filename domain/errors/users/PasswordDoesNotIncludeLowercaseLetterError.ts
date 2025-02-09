import ValidationError from "@app/domain/errors/ValidationError";

export class PasswordDoesNotIncludeLowercaseLetterError extends ValidationError {
  public override readonly name = "PasswordDoesNotIncludeLowercaseLetterError";
}
