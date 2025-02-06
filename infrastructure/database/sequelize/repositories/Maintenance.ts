import { Op } from 'sequelize';

import MaintenancesRepository from '@app/domain/repositories/MaintenancesRepository';
import MaintenanceModel from '@app/sequelize/models/Maintenance';
import MaintenanceNotFoundError from '@app/domain/errors/maintenances/MaintenanceNotFoundError';

import Maintenance from '@app/domain/entities/Maintenance';

export default class SequelizeMaintenanceRepository implements MaintenancesRepository {

    async create(maintenance: Maintenance): Promise<Maintenance> {
        const newMaintenance = await MaintenanceModel.create(maintenance);

        return Maintenance.fromSequelizeModel(newMaintenance, false);
    }

    async update(identifier: string, maintenance: Partial<Maintenance>): Promise<Maintenance | null> {
        const maintenanceToUpdate = await MaintenanceModel.findByPk(identifier);

        if(!maintenanceToUpdate) throw new MaintenanceNotFoundError();

        await maintenanceToUpdate.update(maintenance);

        return Maintenance.fromSequelizeModel(maintenanceToUpdate, false);
    }

    async remove(identifier: string): Promise<void> {
        const maintenance = await MaintenanceModel.findByPk(identifier);

        if(!maintenance) throw new MaintenanceNotFoundError();

        await maintenance.destroy();
    }

    async findOne(identifier: string): Promise<Maintenance | null> {
        const maintenance = await MaintenanceModel.findByPk(identifier);

        if(!maintenance) throw new MaintenanceNotFoundError();

        return Maintenance.fromSequelizeModel(maintenance);
    }

    async findAll(): Promise<Maintenance[]> {
        const maintenances = await MaintenanceModel.findAll();

        return maintenances.map((maintenance) => Maintenance.fromSequelizeModel(maintenance));
    }

    async searchByBikeVin(vin: string): Promise<Maintenance[]> {
        /*const maintenances = await MaintenanceModel.findAll({
            where: {
                bike: {
                    [Op.like]: `%${vin}%`
                }
            }
        });
        */
        const maintenances: any[] = []; // @TODO: Implement search by bike vin

        return maintenances.map((maintenance) => Maintenance.fromSequelizeModel(maintenance));
    }

}
