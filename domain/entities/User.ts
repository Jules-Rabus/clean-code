import UserModel from "@app/sequelize/models/User";
import { Role } from "@app/domain/value-objects/Role";

export default class User {
  public constructor(
    public identifier: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public roles: Role[],
    public isActive: boolean,
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
      sequelizeUser.createdAt,
      sequelizeUser.updatedAt,
    );
  }
}
