import Bike from "./Bike";
import MaintenanceModel from "../../infrastructure/database/sequelize/models/Maintenance";

export default class Maintenance {
    public constructor(
        public id: string,
        public startDate: Date,
        public endDate: Date,
        public description: string,
        public bike: Bike,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}

    static fromSequelizeModel(sequelizeMaintenance: MaintenanceModel): Maintenance {
        return new Maintenance(
            sequelizeMaintenance.id,
            sequelizeMaintenance.startDate,
            sequelizeMaintenance.endDate,
            sequelizeMaintenance.description,
            Bike.fromSequelizeModel(sequelizeMaintenance.bike),
            sequelizeMaintenance.createdAt,
            sequelizeMaintenance.updatedAt,
        );
    }

}