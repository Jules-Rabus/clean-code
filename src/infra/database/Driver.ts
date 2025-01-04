import { Sequelize, DataTypes } from "sequelize";

import { DriverRepositoryInterface } from "../../domain/repositories/Driver";
import { Driver } from "../../domain/entities/Driver";

export class InMemoryDriverRepository implements DriverRepositoryInterface {
    private drivers: Driver[] = [];

    async add(driver: Driver): Promise<void> {
        this.drivers.push(driver);
    }

    async remove(email: string): Promise<void> {
        this.drivers = this.drivers.filter((driver) => driver.email !== email);
    }

    async update(email: string, driver: Partial<Driver>): Promise<void> {
        const driverIndex = this.drivers.findIndex((d) => d.email === email);
        if (driverIndex === -1) {
            throw new Error("Driver not found");
        }

        this.drivers[driverIndex] = {
            ...this.drivers[driverIndex],
            ...driver,
        };
    }

    async getAll(): Promise<Driver[]> {
        return this.drivers;
    }

    async getOne(email: string): Promise<Driver | null> {
        return this.drivers.find((d) => d.email === email) || null;
    }
}

export class SQLDriverRepository implements DriverRepositoryInterface {

    constructor(private DriverModel: any) {}

    async add(driver: Driver): Promise<void> {
        await this.DriverModel.create(driver);
    }

    async remove(email: string): Promise<void> {
        await this.DriverModel.destroy({
            where: {
                email,
            },
        });
    }

    async update(email: string, driver: Partial<Driver>): Promise<void> {
        await this.DriverModel.update(driver, {
            where: {
                email,
            },
        });
    }

    async getAll(): Promise<Driver[]> {
        return this.DriverModel.findAll();
    }

    async getOne(email: string): Promise<Driver | null> {
        return await this.DriverModel.findByPk(email);
    }
}