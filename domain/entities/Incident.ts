import Bike from "./Bike";
import IncidentModel from "@app/sequelize/models/Incident";
import User from "./User";

export default class Incident {
  public constructor(
    public identifier: string,
    public date: Date,
    public description: string,
    public isResolved: boolean,
    public cost: number,
    public user?: User,
    public bike?: Bike,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static fromSequelizeModel(
    sequelizeIncident: IncidentModel,
    _includeRelations: boolean = true,
  ): Incident {
    return new Incident(
      sequelizeIncident.identifier,
      sequelizeIncident.date,
      sequelizeIncident.description,
      sequelizeIncident.isResolved,
      sequelizeIncident.cost,
      _includeRelations ? User.fromSequelizeModel(sequelizeIncident.user) : undefined,
      _includeRelations
        ? Bike.fromSequelizeModel(sequelizeIncident.bike, false)
        : undefined,
      sequelizeIncident.createdAt,
      sequelizeIncident.updatedAt,
    );
  }
}
