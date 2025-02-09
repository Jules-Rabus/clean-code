import NotFoundError from "@app/domain/errors/NotFoundError";

export default class BikeNotFoundError extends NotFoundError {
  public override readonly name = "BikeNotFoundError";
}
