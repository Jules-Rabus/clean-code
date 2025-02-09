import NotFoundError from "@app/domain/errors/NotFoundError";

export default class MaintenanceNotFoundError extends NotFoundError {
  public override readonly name = "MaintenanceNotFoundError";
}
