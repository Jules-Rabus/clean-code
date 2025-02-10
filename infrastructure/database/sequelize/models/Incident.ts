import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  AllowNull,
  BelongsTo,
  ForeignKey,
  Default,
  IsUUID,
} from "sequelize-typescript";

import Incident from "@app/domain/entities/Incident";
import BikeModel from "@app/sequelize/models/Bike";
import UserModel from "./User";

@Table({
  tableName: "incidents",
  modelName: "Incident",
  timestamps: true,
  underscored: true,
})
export default class IncidentModel extends Model<Incident> {
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @PrimaryKey
  @Column
  declare identifier: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare date: Date;

  @Column(DataType.STRING)
  declare description: string;

  @Column(DataType.INTEGER)
  declare cost: number;

  @Column(DataType.BOOLEAN)
  declare isResolved: boolean;

  @BelongsTo(() => UserModel)
  declare user: UserModel;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column
  declare userId: string;

  @BelongsTo(() => BikeModel)
  declare bike: BikeModel;

  @ForeignKey(() => BikeModel)
  @AllowNull(false)
  @Column
  declare bikeVin: string;
}
