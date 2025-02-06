import ValidationError from "@app/domain/errors/ValidationError";


export class PasswordDoesNotIncludeNumberError extends ValidationError {
    public override readonly name = "PasswordDoesNotIncludeNumberError";
}