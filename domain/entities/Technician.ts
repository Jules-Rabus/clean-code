import TechnicianModel from "@app/sequelize/models/Technician";

export default class Technician {
  public constructor(
    public identifier: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static fromSequelizeModel(sequelizeTechnician: TechnicianModel): Technician {
    return new Technician(
      sequelizeTechnician.identifier,
      sequelizeTechnician.firstName,
      sequelizeTechnician.lastName,
      sequelizeTechnician.email,
      sequelizeTechnician.phone,
      sequelizeTechnician.createdAt,
      sequelizeTechnician.updatedAt,
    );
  }
}
