import NotFound from "@app/domain/errors/NotFoundError";

export default class PartNotFoundError extends NotFound {
  public override name = "PartNotFoundError";
}
