import Bike from "./Bike";
import MaintenanceModel from "@app/sequelize/models/Maintenance";

export default class Maintenance {
  public constructor(
    public identifier: string,
    public startDate: Date,
    public endDate: Date,
    public description: string,
    public isDone: boolean,
    public bike?: Bike,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static fromSequelizeModel(
    sequelizeMaintenance: MaintenanceModel,
    _includeRelations: boolean = true,
  ): Maintenance {
    return new Maintenance(
      sequelizeMaintenance.identifier,
      sequelizeMaintenance.startDate,
      sequelizeMaintenance.endDate,
      sequelizeMaintenance.description,
      sequelizeMaintenance.isDone,
      _includeRelations
        ? Bike.fromSequelizeModel(sequelizeMaintenance.bike, false)
        : undefined,
      sequelizeMaintenance.createdAt,
      sequelizeMaintenance.updatedAt,
    );
  }
}
