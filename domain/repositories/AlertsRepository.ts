import Alert from "@app/domain/entities/Alert";
import AlertNotFoundError from "@app/domain/errors/alerts/AlertNotFoundError";

export default interface AlertsRepository {
  create(alert: Alert): Promise<Alert>;
  update(
    id: string,
    alert: Partial<Alert>,
  ): Promise<Alert | AlertNotFoundError>;
  findOne(id: string): Promise<Alert | AlertNotFoundError>;
  findAll(): Promise<Alert[]>;
  searchByPart(part: string): Promise<Alert[]>;
}
