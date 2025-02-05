import Maintenance from '@app/domain/entities/Maintenance';

export default interface MaintenancesRepository {
    create(maintenance: Maintenance): Promise<Maintenance>;
    update(identifier: string, maintenance: Partial<Maintenance>): Promise<Maintenance | null>;
    remove(identifier: string): Promise<void>;
    findOne(identifier: string): Promise<Maintenance | null>;
    findAll(): Promise<Maintenance[]>;
    searchByBikeVin(vin: string): Promise<Maintenance[]>;
}