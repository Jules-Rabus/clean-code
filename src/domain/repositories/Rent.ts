import { Rent } from "../entities/Rent";

export interface RentRepositoryInterface {
    add(rent: Rent): Promise<void>;
    remove(id: number): Promise<void>;
    update(id: number, rent: Partial<Rent>): Promise<void>;
    getAll(): Promise<Rent[]>;
    getOne(id: number): Promise<Rent | null>;
}