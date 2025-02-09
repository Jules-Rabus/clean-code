import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import BikeModel from "@app/sequelize/models/Bike";
import Maintenance from "@app/domain/entities/Maintenance";

@Table({
  tableName: "maintenances",
  modelName: "Maintenance",
  timestamps: true,
  underscored: true,
})
export default class MaintenanceModel extends Model<Maintenance> {
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @PrimaryKey
  @Column
  declare identifier: string;

  @Column(DataType.DATE)
  declare startDate: Date;

  @Column(DataType.DATE)
  declare endDate: Date;

  @Column(DataType.STRING)
  declare description: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare isDone: boolean;

  @ForeignKey(() => BikeModel)
  @AllowNull(false)
  @Column
  declare bikeVin: string;

  @BelongsTo(() => BikeModel)
  declare bike: BikeModel;
}
