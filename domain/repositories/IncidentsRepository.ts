import Incident from "@app/domain/entities/Incident";
import IncidentNotFoundError from "../errors/incidents/IncidentNotFoundError";

export default interface IncidentsRepository {
  create(incident: Incident): Promise<Incident>;
  update(
    identifier: string,
    incident: Partial<Incident>,
  ): Promise<Incident | IncidentNotFoundError>;
  remove(identifier: string): Promise<number | IncidentNotFoundError>;
  findOne(identifier: string): Promise<Incident | IncidentNotFoundError>;
  findAll(): Promise<Incident[]>;
  searchByBikeVin(vin: string): Promise<Incident[]>;
}
