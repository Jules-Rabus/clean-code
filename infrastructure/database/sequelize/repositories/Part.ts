import { Op } from 'sequelize';

import PartsRepository from '@app/domain/repositories/PartsRepository';
import PartModel from '@app/sequelize/models/Part';
import PartNotFoundError from '@app/domain/errors/parts/PartNotFoundError';

import Part from '@app/domain/entities/Part';

export default class SequelizePartRepository implements PartsRepository {

    async create(part: Part): Promise<Part> {
        const newPart = await PartModel.create(part);

        return Part.fromSequelizeModel(newPart);
    }

    async update(identifier: string, part: Partial<Part>): Promise<Part | null> {
        const partToUpdate = await PartModel.findByPk(identifier);

        if(!partToUpdate) throw new PartNotFoundError();

        await partToUpdate.update(part);

        return Part.fromSequelizeModel(partToUpdate);
    }

    async remove(identifier: string): Promise<void> {
        const part = await PartModel.findByPk(identifier);

        if(!part) throw new PartNotFoundError();

        await part.destroy();
    }

    async findOne(identifier: string): Promise<Part | null> {
        const part = await PartModel.findByPk(identifier);

        if(!part) throw new PartNotFoundError();

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
                    [Op.like]: `%${reference}%`
                }
            }
        });

        return parts.map((part) => Part.fromSequelizeModel(part));
    }
}