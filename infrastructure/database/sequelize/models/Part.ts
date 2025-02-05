import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Unique,
    AllowNull,
    Default,
} from 'sequelize-typescript';

import Part from '@app/domain/entities/Part';
  
@Table({
tableName: 'parts',
modelName: 'Part',
timestamps: true,
underscored: true,
})

export default class PartModel extends Model<Part> {

    @PrimaryKey
    @Unique
    @AllowNull(false)
    @Default(DataType.UUIDV4)
    @Column(DataType.UUIDV4)
    declare id: string;

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