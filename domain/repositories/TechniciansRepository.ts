import Technician from "@app/domain/entities/Technician";

export default interface TechniciansRepository {
    create(technician: Technician): Promise<Technician>;
    update(identifier: string, technician: Partial<Technician>): Promise<Technician | null>;
    remove(identifier: string): Promise<void>;
    findOne(identifier: string): Promise<Technician | null>;
    findAll(): Promise<Technician[]>;
    searchByEmail(email: string): Promise<Technician[]>;
}