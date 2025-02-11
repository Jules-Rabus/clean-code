import {
  HasMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
  AllowNull,
  Default,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";

import Trip from "@app/domain/entities/Trip";
import UserModel from "./User";
import BikeModel from "./Bike";

@Table({
  tableName: "trips",
  modelName: "Trip",
  timestamps: true,
  underscored: true,
})
export default class TripModel extends Model<Trip> {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column
  declare identifier: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare startDate: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare endDate: Date;

  @Column(DataType.STRING)
  declare destination: string;

  @Column(DataType.STRING)
  declare description: string;

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
