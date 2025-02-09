import NotFoundError from "@app/domain/errors/NotFoundError";

export default class IncidentNotFoundError extends NotFoundError {
    public override readonly name = "IncidentNotFoundError";
}