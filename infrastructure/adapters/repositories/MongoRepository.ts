import BikesRepository from '@app/domain/repositories/BikesRepository';
import Bike from '@app/domain/entities/Bike';
import BikeModel from '@app/sequelize/models/Bike';

export class MongoRepository implements BikesRepository {

    async create(bike: Bike) {
        try {
            const newBike = new BikeModel(bike);
            return await newBike.save();
        } catch (error) {
            console.error('Error creating bike:', error);
            throw error;
        }
    }

    async findAll() {
        try {
            return await BikeModel.find();
        } catch (error) {
            console.error('Error fetching all bikes:', error);
            throw error;
        }
    }

    async findOne(id: number){
        try {
            return await BikeModel.findById(id);
        } catch (error) {
            console.error(`Error fetching bike with id ${id}:`, error);
            throw error;
        }
    }

    async update(id: string, bike: Partial<Bike>){
        try {
            return await BikeModel.findByIdAndUpdate(id, bike);
        } catch (error) {
            console.error(`Error updating bike with id ${id}:`, error);
            throw error;
        }
    }

    async remove(id: number){
        try {
            await BikeModel.findByIdAndDelete(id);
        } catch (error) {
            console.error(`Error removing bike with id ${id}:`, error);
            throw error;
        }
    }
}
