import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
  AllowNull,
  Default,
  IsUUID,
} from "sequelize-typescript";

import Technician from "@app/domain/entities/Technician";

@Table({
  tableName: "technicians",
  modelName: "Technician",
  timestamps: true,
  underscored: true,
})
export default class TechnicianModel extends Model<Technician> {
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @PrimaryKey
  @Column
  declare identifier: string;

  @Column(DataType.STRING)
  declare firstName: string;

  @Column(DataType.STRING)
  declare lastName: string;

  @Column(DataType.STRING)
  declare email: string;

  @Column(DataType.STRING)
  declare phone: string;
}
