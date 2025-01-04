import { Sequelize, DataTypes } from "sequelize";

import { MotorcycleRepositoryInterface } from "../../domain/repositories/Motorcycle";
import { Motorcycle } from "../../domain/entities/Motorcycle";
import { immatriculationIdentifier } from "../../domain/value-objects/immatriculationIdentifier";

export class InMemoryMotorcycleRepository implements MotorcycleRepositoryInterface {
    private motorcycles: Motorcycle[] = [];

    async add(motorcycle: Motorcycle): Promise<void> {
        this.motorcycles.push(motorcycle);
    }

    async remove(immatriculation: immatriculationIdentifier): Promise<void> {
        this.motorcycles = this.motorcycles.filter((motorcycle) => motorcycle.immatriculation !== immatriculation);
    }
    
    async update(immatriculation: immatriculationIdentifier, motorcycle: Partial<Motorcycle>): Promise<void> {
        const motorcycleIndex = this.motorcycles.findIndex((m) => m.immatriculation === immatriculation);
        if (motorcycleIndex === -1) {
            throw new Error("Motorcycle not found");
        }

        this.motorcycles[motorcycleIndex] = {
            ...this.motorcycles[motorcycleIndex],
            ...motorcycle,
        };
    }

    async getAll(): Promise<Motorcycle[]> {
        return this.motorcycles;
    }

    async getOne(immatriculation: immatriculationIdentifier): Promise<Motorcycle | null> {
        return this.motorcycles.find((m) => m.immatriculation === immatriculation) || null;
    }
}

export class SQLMotorcycleRepository implements MotorcycleRepositoryInterface {
    private sequelize: Sequelize;
    private MotorcycleModel: any;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
        this.MotorcycleModel = this.sequelize.define("Motorcycle", {
            immatriculationIdentifier: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            kilometers: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        });
    }

    async add(motorcycle: Motorcycle): Promise<void> {
        await this.MotorcycleModel.create(motorcycle);
    }

    async remove(immatriculation: immatriculationIdentifier): Promise<void> {
        await this.MotorcycleModel.destroy({
            where: {
                immatriculation,
            },
        });
    }

    async update(immatriculation: immatriculationIdentifier, motorcycle: Partial<Motorcycle>): Promise<void> {
        await this.MotorcycleModel.update(motorcycle, {
            where: {
                immatriculation,
            },
        });
    }

    async getAll(): Promise<Motorcycle[]> {
        return this.MotorcycleModel.findAll();
    }

    async getOne(immatriculation: immatriculationIdentifier): Promise<Motorcycle | null> {
        return this.MotorcycleModel.findOne({
            where: {
                immatriculation,
            },
        });
    }
}