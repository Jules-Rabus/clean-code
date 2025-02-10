import { Op } from "sequelize";

import MaintenancesRepository from "@app/domain/repositories/MaintenancesRepository";
import MaintenanceModel from "@app/sequelize/models/Maintenance";
import MaintenanceNotFoundError from "@app/domain/errors/maintenances/MaintenanceNotFoundError";

import Maintenance from "@app/domain/entities/Maintenance";
import BikeModel from "../models/Bike";

export default class SequelizeMaintenanceRepository
  implements MaintenancesRepository
{
  async create(maintenance: Maintenance): Promise<Maintenance> {
    const newMaintenance = await MaintenanceModel.create(maintenance);

    return Maintenance.fromSequelizeModel(newMaintenance, false);
  }

  async update(
    identifier: string,
    maintenance: Partial<Maintenance>,
  ): Promise<Maintenance | MaintenanceNotFoundError> {
    const maintenanceToUpdate = await MaintenanceModel.findByPk(identifier, {
      include: [BikeModel],
    });

    if (!maintenanceToUpdate) return new MaintenanceNotFoundError();

    await maintenanceToUpdate.update(maintenance);

    return Maintenance.fromSequelizeModel(maintenanceToUpdate);
  }

  async remove(identifier: string): Promise<number | MaintenanceNotFoundError> {
    const deletedMaintenance = await MaintenanceModel.destroy({
      where: { identifier },
    });

    if (deletedMaintenance === 0) return new MaintenanceNotFoundError();

    return deletedMaintenance;
  }

  async findOne(
    identifier: string,
  ): Promise<Maintenance | MaintenanceNotFoundError> {
    const maintenance = await MaintenanceModel.findByPk(identifier, {
      include: [BikeModel],
    });

    if (!maintenance) return new MaintenanceNotFoundError();

    return Maintenance.fromSequelizeModel(maintenance);
  }

  async findAll(): Promise<Maintenance[]> {
    const maintenances = await MaintenanceModel.findAll({
      include: [BikeModel],
    });

    return maintenances.map((maintenance: MaintenanceModel) =>
      Maintenance.fromSequelizeModel(maintenance),
    );
  }

  async searchByBikeVin(vin: string): Promise<Maintenance[]> {
    const maintenances = await MaintenanceModel.findAll({
      include: [
        {
          model: BikeModel,
          where: { vin },
        },
      ],
    });

    return maintenances.map((maintenance) =>
      Maintenance.fromSequelizeModel(maintenance),
    );
  }
}
