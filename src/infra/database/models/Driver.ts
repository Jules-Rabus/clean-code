
import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class DriverModel extends Model {

  @PrimaryKey
  email: string;

  @Column({ allowNull: false })
  firstName: string;

  @Column({ allowNull: false })
  lastName: string;

  @Column({ type: 'DATE', allowNull: false })
  licenseDate: Date;
}
