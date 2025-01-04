import { Driver } from "../entities/Driver";

export interface DriverRepositoryInterface {
    add(driver: Driver): Promise<void>;
    remove(email: string): Promise<void>;
    update(email: string, driver:Partial<Driver>): Promise<void>;
    getAll(): Promise<Driver[]>;
    getOne(email: string): Promise<Driver | null>;
}