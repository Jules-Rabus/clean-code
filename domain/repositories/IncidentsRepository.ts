import Incident from '@app/domain/entities/Incident';

export default interface IncidentsRepository {
    create(incident: Incident): Promise<Incident>;
    update(identifier: string, incident: Partial<Incident>): Promise<Incident | null>;
    remove(identifier: string): Promise<void>;
    findOne(identifier: string): Promise<Incident | null>;
    findAll(): Promise<Incident[]>;
    searchByBikeVin(vin: string): Promise<Incident[]>;
}