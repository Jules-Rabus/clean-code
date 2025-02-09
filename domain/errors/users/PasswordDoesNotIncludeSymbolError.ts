import ValidationError from "@app/domain/errors/ValidationError";

export class PasswordDoesNotIncludeSymbolError extends ValidationError {
  public override readonly name = "PasswordDoesNotIncludeSymbolError";
}
