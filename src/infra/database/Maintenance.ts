import { Sequelize, DataTypes } from "sequelize";

import { MaintenanceRepositoryInterface } from "../../domain/repositories/Maintenance";
import { Maintenance } from "../../domain/entities/Maintenance";

export class InMemoryMaintenanceRepository implements MaintenanceRepositoryInterface {
    private maintenances: Maintenance[] = [];

    async add(maintenance: Maintenance): Promise<void> {
        this.maintenances.push(maintenance);
    }

    async remove(id: number): Promise<void> {
        this.maintenances = this.maintenances.filter((maintenance) => maintenance.id !== id);
    }

    async update(id: number, maintenance: Partial<Maintenance>): Promise<void> {
        const maintenanceIndex = this.maintenances.findIndex((m) => m.id === id);
        if (maintenanceIndex === -1) {
            throw new Error("Maintenance not found");
        }

        this.maintenances[maintenanceIndex] = {
            ...this.maintenances[maintenanceIndex],
            ...maintenance,
        };
    }

    async getAll(): Promise<Maintenance[]> {
        return this.maintenances;
    }

    async getOne(id: number): Promise<Maintenance | null> {
        return this.maintenances.find((m) => m.id === id) || null;
    }
}

export class SQLMaintenanceRepository implements MaintenanceRepositoryInterface {
    private sequelize: Sequelize;
    private MaintenanceModel: any;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
        this.MaintenanceModel = this.sequelize.define("Maintenance", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            date: {
                type: DataTypes.DATE,
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

    async add(maintenance: Maintenance): Promise<void> {
        await this.MaintenanceModel.create(maintenance);
    }

    async remove(id: number): Promise<void> {
        await this.MaintenanceModel.destroy({
            where: {
                id,
            },
        });
    }

    async update(id: number, maintenance: Partial<Maintenance>): Promise<void> {
        await this.MaintenanceModel.update(maintenance, {
            where: {
                id,
            },
        });
    }

    async getAll(): Promise<Maintenance[]> {
        return this.MaintenanceModel.findAll();
    }

    async getOne(id: number): Promise<Maintenance | null> {
        return this.MaintenanceModel.findByPk(id);
    }
}
