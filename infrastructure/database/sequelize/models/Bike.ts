import {
  HasMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import Bike from '@app/domain/entities/Bike';
import MaintenanceModel from '@app/sequelize/models/Maintenance';

@Table({
  tableName: 'bikes',
  modelName: 'Bike',
  timestamps: true,
  underscored: true,
})
export default class BikeModel extends Model<Bike> {

    @PrimaryKey
    @Column(DataType.STRING)
    @Unique
    declare vin: string;

    @Column(DataType.STRING)
    declare brand: string;

    @Column(DataType.STRING)
    declare model: string;

    @Column(DataType.INTEGER)
    declare mileage: number;

    @Column(DataType.DATE)
    declare purchaseDate: Date;

    @Column(DataType.DATE)
    declare warrantyExpirationDate: Date;

    @Column(DataType.BOOLEAN)
    declare isActive: boolean;

    @Column(DataType.BOOLEAN)
    declare isDecommissioned: boolean;

    @HasMany(() => MaintenanceModel)
    declare maintenances: MaintenanceModel[];
}