import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Default,
    Unique,
    AllowNull,
} from 'sequelize-typescript';

import User from '@app/domain/entities/User';
  
@Table({
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    underscored: true,
})
export default class UserModel extends Model<User> {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUIDV4)
    declare id: string;

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
    declare roles: string[];

    @Column(DataType.BOOLEAN)
    declare isActive: boolean;

    @Column(DataType.BOOLEAN)
    declare isEmailVerified: boolean;
}