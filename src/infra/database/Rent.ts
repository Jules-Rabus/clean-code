import { Sequelize, DataTypes } from "sequelize";

import { RentRepositoryInterface } from "../../domain/repositories/Rent";
import { Rent } from "../../domain/entities/Rent";

export class InMemoryRentRepository implements RentRepositoryInterface {
    private rents: Rent[] = [];

    async add(rent: Rent): Promise<void> {
        this.rents.push(rent);
    }

    async remove(id: number): Promise<void> {
        this.rents = this.rents.filter((rent) => rent.id !== id);
    }

    async update(id: number, rent: Partial<Rent>): Promise<void> {
        const rentIndex = this.rents.findIndex((r) => r.id === id);
        if (rentIndex === -1) {
            throw new Error("Rent not found");
        }

        this.rents[rentIndex] = {
            ...this.rents[rentIndex],
            ...rent,
        };
    }

    async getAll(): Promise<Rent[]> {
        return this.rents;
    }

    async getOne(id: number): Promise<Rent | null> {
        return this.rents.find((r) => r.id === id) || null;
    }
}

export class SQLRentRepository implements RentRepositoryInterface {
    private sequelize: Sequelize;
    private RentModel: any;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
        this.RentModel = this.sequelize.define("Rent", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        });
    }

    async add(rent: Rent): Promise<void> {
        await this.RentModel.create(rent);
    }

    async remove(id: number): Promise<void> {
        await this.RentModel.destroy({
            where: {
                id,
            },
        });
    }

    async update(id: number, rent: Partial<Rent>): Promise<void> {
        await this.RentModel.update(rent, {
            where: {
                id,
            },
        });
    }

    async getAll(): Promise<Rent[]> {
        return await this.RentModel.findAll();
    }

    async getOne(id: number): Promise<Rent | null> {
        return await this.RentModel.findByPk(id);
    }

}



