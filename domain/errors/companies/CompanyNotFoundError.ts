import NotFoundError from "@app/domain/errors/NotFoundError";

export default class CompanyNotFoundError extends NotFoundError {
    public override readonly name = 'CompanyNotFoundError';
}