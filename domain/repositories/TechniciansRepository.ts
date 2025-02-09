import Technician from "@app/domain/entities/Technician";
import TechnicianNotFoundError from "../errors/technicians/TechnicianNotFoundError";

export default interface TechniciansRepository {
    create(technician: Technician): Promise<Technician>;
    update(identifier: string, technician: Partial<Technician>): Promise<Technician | TechnicianNotFoundError>;
    remove(identifier: string): Promise<number | TechnicianNotFoundError>;
    findOne(identifier: string): Promise<Technician | TechnicianNotFoundError>;
    findAll(): Promise<Technician[]>;
    searchByEmail(email: string): Promise<Technician[]>;
}