import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Default,
    Unique,
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
    @Column(DataType.UUID)
    declare id: string;

    @Unique
    @Column(DataType.STRING)
    declare email: string;

    @Column(DataType.STRING)
    declare firstName: string;

    @Column(DataType.STRING)
    declare lastName: string;

    @Column(DataType.STRING)
    declare password: string;

    @Column(DataType.ARRAY(DataType.STRING))
    declare roles: string[];

    @Column(DataType.BOOLEAN)
    declare isActive: boolean;

    @Column(DataType.BOOLEAN)
    declare isEmailVerified: boolean;
}