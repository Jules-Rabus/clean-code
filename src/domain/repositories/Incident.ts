import { Incident } from "../entities/Incident";

export interface IncidentRepositoryInterface {
    add(incident: Incident): Promise<void>;
    remove(id: number): Promise<void>;
    update(id: number, incident: Partial<Incident>): Promise<void>;
    getAll(): Promise<Incident[]>;
    getOne(id: number): Promise<Incident | null>;
}