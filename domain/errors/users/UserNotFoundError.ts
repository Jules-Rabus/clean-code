import NotFoundError from "@app/domain/errors/NotFoundError";

export default class UserNotFoundError extends NotFoundError {
    public override readonly name = "UserNotFoundError";
}