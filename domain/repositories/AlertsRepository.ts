import Alert from "../entities/alert";
import AlertNotFoundError from "../errors/alerts/AlertNotFoundError";

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
