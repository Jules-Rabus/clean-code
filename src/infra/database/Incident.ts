import { Sequelize, DataTypes } from "sequelize";

import { IncidentRepositoryInterface } from "../../domain/repositories/Incident";
import { Incident } from "../../domain/entities/Incident";
import { IncidentType } from "../../domain/entities/Incident";

export class InMemoryIncidentRepository implements IncidentRepositoryInterface {
    private incidents: Incident[] = [];

    async add(incident: Incident): Promise<void> {
        this.incidents.push(incident);
    }

    async remove(id: number): Promise<void> {
        this.incidents = this.incidents.filter((incident) => incident.id !== id);
    }

    async update(id: number, incident: Partial<Incident>): Promise<void> {
        const incidentIndex = this.incidents.findIndex((i) => i.id === id);
        if (incidentIndex === -1) {
            throw new Error("Incident not found");
        }

        this.incidents[incidentIndex] = {
            ...this.incidents[incidentIndex],
            ...incident,
        };
    }

    async getAll(): Promise<Incident[]> {
        return this.incidents;
    }

    async getOne(id: number): Promise<Incident | null> {
        return this.incidents.find((i) => i.id === id) || null;
    }
}

export class SQLIncidentRepository implements IncidentRepositoryInterface {
    private sequelize: Sequelize;
    private IncidentModel: any;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
        this.IncidentModel = this.sequelize.define("Incident", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
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

    async add(incident: Incident): Promise<void> {
        await this.IncidentModel.create(incident);
    }

    async remove(id: number): Promise<void> {
        await this.IncidentModel.destroy({
            where: {
                id,
            },
        });
    }

    async update(id: number, incident: Partial<Incident>): Promise<void> {
        await this.IncidentModel.update(incident, {
            where: {
                id,
            },
        });
    }

    async getAll(): Promise<Incident[]> {
        return this.IncidentModel.findAll();
    }

    async getOne(id: number): Promise<Incident | null> {
        return this.IncidentModel.findByPk(id);
    }

}

