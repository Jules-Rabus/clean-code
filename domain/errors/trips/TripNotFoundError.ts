import NotFoundError from "@app/domain/errors/NotFoundError";

export default class TripNotFoundError extends NotFoundError {
  public override readonly name = "TripNotFoundError";
}
