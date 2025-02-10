import { Op } from "sequelize";

import BikesRepository from "@app/domain/repositories/BikesRepository";
import BikeModel from "@app/sequelize/models/Bike";
import BikeNotFoundError from "@app/domain/errors/bikes/BikeNotFoundError";

import VinIdentifier from "@app/domain/value-objects/VinIdentifier";
import Bike from "@app/domain/entities/Bike";
import IncidentModel from "@app/sequelize/models/Incident";
import MaintenanceModel from "@app/sequelize/models/Maintenance";

export default class SequelizeBikeRepository implements BikesRepository {
  async create(bike: Bike): Promise<Bike> {
    const newBike = await BikeModel.create(bike, {
      include: [IncidentModel, MaintenanceModel],
    });

    return Bike.fromSequelizeModel(newBike);
  }

  async update(
    vin: VinIdentifier,
    bike: Partial<Bike>,
  ): Promise<Bike | BikeNotFoundError> {
    const bikeToUpdate = await BikeModel.findByPk(vin.value, {
      include: [IncidentModel, MaintenanceModel],
    });

    if (!bikeToUpdate) return new BikeNotFoundError();

    await bikeToUpdate.update(bike);

    return Bike.fromSequelizeModel(bikeToUpdate);
  }

  async remove(vin: VinIdentifier): Promise<number | BikeNotFoundError> {
    const deletedBike = await BikeModel.destroy({ where: { vin: vin.value } });

    if (deletedBike === 0) return new BikeNotFoundError();

    return deletedBike;
  }

  async findOne(vin: VinIdentifier): Promise<Bike | BikeNotFoundError> {
    const bike = await BikeModel.findByPk(vin.value, {
      include: [IncidentModel, MaintenanceModel],
    });

    if (!bike) return new BikeNotFoundError();

    return Bike.fromSequelizeModel(bike);
  }

  async findAll(): Promise<Bike[]> {
    const bikes = await BikeModel.findAll({
      include: [IncidentModel, MaintenanceModel],
    });

    return bikes.map((bike: BikeModel) => Bike.fromSequelizeModel(bike));
  }

  async searchByVin(vin: VinIdentifier): Promise<Bike[]> {
    const bikes = await BikeModel.findAll({
      where: { vin: vin.value },
      include: [IncidentModel, MaintenanceModel],
    });

    return bikes.map((bike) => Bike.fromSequelizeModel(bike));
  }

  async searchByModel(model: string): Promise<Bike[]> {
    const bikes = await BikeModel.findAll({
      where: {
        model: {
          [Op.like]: `%${model}%`,
        },
      },
    });

    return bikes.map((bike) => Bike.fromSequelizeModel(bike));
  }
}
