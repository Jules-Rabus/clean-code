import { Op } from "sequelize";

import TechniciansRepository from "@app/domain/repositories/TechniciansRepository";
import TechnicianModel from "@app/sequelize/models/Technician";
import TechnicianNotFoundError from "@app/domain/errors/technicians/TechnicianNotFoundError";

import Technician from "@app/domain/entities/Technician";

export default class SequelizeTechnicianRepository
  implements TechniciansRepository
{
  async create(technician: Technician): Promise<Technician> {
    const newTechnician = await TechnicianModel.create(technician);

    return Technician.fromSequelizeModel(newTechnician);
  }

  async update(
    identifier: string,
    technician: Partial<Technician>,
  ): Promise<Technician | null> {
    const technicianToUpdate = await TechnicianModel.findByPk(identifier);

    if (!technicianToUpdate) throw new TechnicianNotFoundError();

    await technicianToUpdate.update(technician);

    return Technician.fromSequelizeModel(technicianToUpdate);
  }

  async remove(identifier: string): Promise<void> {
    const technician = await TechnicianModel.findByPk(identifier);

    if (!technician) throw new TechnicianNotFoundError();

    await technician.destroy();
  }

  async findOne(identifier: string): Promise<Technician | null> {
    const technician = await TechnicianModel.findByPk(identifier);

    if (!technician) throw new TechnicianNotFoundError();

    return Technician.fromSequelizeModel(technician);
  }

  async findAll(): Promise<Technician[]> {
    const technicians = await TechnicianModel.findAll();

    return technicians.map((technician) =>
      Technician.fromSequelizeModel(technician),
    );
  }

  async searchByEmail(email: string): Promise<Technician[]> {
    const technicians = await TechnicianModel.findAll({
      where: {
        email: {
          [Op.like]: `%${email}%`,
        },
      },
    });

    return technicians.map((technician) =>
      Technician.fromSequelizeModel(technician),
    );
  }
}
