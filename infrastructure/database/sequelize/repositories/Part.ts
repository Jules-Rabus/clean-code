import { Op } from "sequelize";

import PartsRepository from "@app/domain/repositories/PartsRepository";
import PartModel from "@app/sequelize/models/Part";
import PartNotFoundError from "@app/domain/errors/parts/PartNotFoundError";

import Part from "@app/domain/entities/Part";

export default class SequelizePartRepository implements PartsRepository {
  async create(part: Part): Promise<Part> {
    const newPart = await PartModel.create(part);

    return Part.fromSequelizeModel(newPart);
  }

  async update(
    identifier: string,
    part: Partial<Part>,
  ): Promise<Part | PartNotFoundError> {
    const partToUpdate = await PartModel.findByPk(identifier);

    if (!partToUpdate) return new PartNotFoundError();

    await partToUpdate.update(part);

    return Part.fromSequelizeModel(partToUpdate);
  }

  async remove(identifier: string): Promise<number | PartNotFoundError> {
    const deletedPart = await PartModel.destroy({ where: { identifier } });

    if (deletedPart === 0) return new PartNotFoundError();

    return deletedPart;
  }

  async findOne(identifier: string): Promise<Part | PartNotFoundError> {
    const part = await PartModel.findByPk(identifier);

    if (!part) return new PartNotFoundError();

    return Part.fromSequelizeModel(part);
  }

  async findAll(): Promise<Part[]> {
    const parts = await PartModel.findAll();

    return parts.map((part) => Part.fromSequelizeModel(part));
  }

  async searchByReference(reference: string): Promise<Part[]> {
    const parts = await PartModel.findAll({
      where: {
        reference: {
          [Op.like]: `%${reference}%`,
        },
      },
    });

    return parts.map((part) => Part.fromSequelizeModel(part));
  }

  async findLowStockParts(): Promise<Part[]> {
    const parts = await PartModel.findAll({
      where: {
        stockQuantity: {
          [Op.lte]: "minStockLevel",
        },
      },
    });

    return parts.map((part) => Part.fromSequelizeModel(part));
  }
}
