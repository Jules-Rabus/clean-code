import NotFoundError from "@app/domain/errors/NotFoundError";

export default class TechnicianNotFoundError extends NotFoundError {
    public override readonly name = "TechnicianNotFoundError";
}