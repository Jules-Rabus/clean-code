import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Unique,
    AllowNull,
    BelongsTo,
    ForeignKey,
    Default,
} from 'sequelize-typescript';

import Incident from '@app/domain/entities/Incident';
import BikeModel from '@app/sequelize/models/Bike';
  
@Table({
tableName: 'incidents',
modelName: 'Incident',
timestamps: true,
underscored: true,
})

export default class IncidentModel extends Model<Incident> {

    @PrimaryKey
    @Unique
    @AllowNull(false)
    @Default(DataType.UUIDV4)
    @Column(DataType.UUIDV4)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    declare date: Date;

    @Column(DataType.STRING)
    declare description: string;

    @Column(DataType.BOOLEAN)
    declare isResolved: boolean;

    @BelongsTo(() => BikeModel)
    declare bike: BikeModel;

    @ForeignKey(() => BikeModel)
    @AllowNull(false)
    @Column
    declare bikeVin: string;
}