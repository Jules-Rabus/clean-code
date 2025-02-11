import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Default,
  Unique,
  AllowNull,
  IsUUID,
  HasMany,
} from "sequelize-typescript";

import User from "@app/domain/entities/User";
import { Role } from "@app/domain/value-objects/Role";
import IncidentModel from "./Incident";
import TripModel from "./Trip";

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
  underscored: true,
})
export default class UserModel extends Model<User> {
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @PrimaryKey
  @Column
  declare identifier: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare lastName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @Column(DataType.ARRAY(DataType.STRING))
  declare roles: Role[];

  @Column(DataType.BOOLEAN)
  declare isActive: boolean;

  @HasMany(() => IncidentModel)
  declare incidents: IncidentModel[];

  @HasMany(() => TripModel)
  declare trips: TripModel[];
}
