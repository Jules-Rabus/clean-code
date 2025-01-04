import { Maintenance } from "../entities/Maintenance";

export interface MaintenanceRepositoryInterface {
    add(maintenance: Maintenance): Promise<void>;
    remove(id: number): Promise<void>;
    update(id: number, maintenance: Partial<Maintenance>): Promise<void>;
    getAll(): Promise<Maintenance[]>;
    getOne(id: number): Promise<Maintenance | null>;
}