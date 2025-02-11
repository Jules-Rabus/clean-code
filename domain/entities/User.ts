import UserModel from "@app/sequelize/models/User";
import { Role } from "@app/domain/value-objects/Role";
import Incident from "./Incident";
import Trip from "./Trip";

export default class User {
  public constructor(
    public identifier: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public roles: Role[],
    public isActive: boolean,
    public incidents?: Incident[],
    public trips?: Trip[],
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static fromSequelizeModel(sequelizeUser: UserModel): User {
    return new User(
      sequelizeUser.identifier,
      sequelizeUser.email,
      sequelizeUser.firstName,
      sequelizeUser.lastName,
      sequelizeUser.password,
      sequelizeUser.roles,
      sequelizeUser.isActive,
      sequelizeUser.incidents?.map((incident) =>
        Incident.fromSequelizeModel(incident, false),
      ) || [],
      sequelizeUser.trips?.map((trip) =>
        Trip.fromSequelizeModel(trip, false),
      ) || [],
      sequelizeUser.createdAt,
      sequelizeUser.updatedAt,
    );
  }
}
