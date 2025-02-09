import Maintenance from "@app/domain/entities/Maintenance";
import MaintenanceNotFoundError from "../errors/maintenances/MaintenanceNotFoundError";

export default interface MaintenancesRepository {
  create(maintenance: Maintenance): Promise<Maintenance>;
  update(
    identifier: string,
    maintenance: Partial<Maintenance>,
  ): Promise<Maintenance | MaintenanceNotFoundError>;
  remove(identifier: string): Promise<number | MaintenanceNotFoundError>;
  findOne(identifier: string): Promise<Maintenance | MaintenanceNotFoundError>;
  findAll(): Promise<Maintenance[]>;
  searchByBikeVin(vin: string): Promise<Maintenance[]>;
}
