import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  AllowNull,
  Default,
  IsUUID,
} from "sequelize-typescript";

import Part from "@app/domain/entities/Part";

@Table({
  tableName: "parts",
  modelName: "Part",
  timestamps: true,
  underscored: true,
})
export default class PartModel extends Model<Part> {
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @PrimaryKey
  @Column
  declare identifier: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare reference: string;

  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare description: string;

  @Column(DataType.INTEGER)
  declare stockQuantity: number;

  @Column(DataType.INTEGER)
  declare minStockLevel: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare price: number;
}
