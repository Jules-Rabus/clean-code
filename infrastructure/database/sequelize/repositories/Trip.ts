import TripsRepository from "@app/domain/repositories/TripsRepository";
import TripModel from "../models/Trip";
import TripNotFoundError from "@app/domain/errors/trips/TripNotFoundError";

import Trip from "@app/domain/entities/Trip";
import UserModel from "../models/User";
import BikeModel from "../models/Bike";

export default class SequelizeTripRepository implements TripsRepository {
    async create(trip: Trip): Promise<Trip> {
        const newTrip = await TripModel.create(trip);
    
        return Trip.fromSequelizeModel(newTrip, false);
    }
    
    async update(
        identifier: string,
        trip: Partial<Trip>,
    ): Promise<Trip | TripNotFoundError> {
        const tripToUpdate = await TripModel.findByPk(identifier, {
        include: [UserModel, BikeModel],
        });
    
        if (!tripToUpdate) return new TripNotFoundError();
    
        await tripToUpdate.update(trip);
    
        return Trip.fromSequelizeModel(tripToUpdate);
    }
    
    async remove(identifier: string): Promise<number | TripNotFoundError> {
        const deletedTrip = await TripModel.destroy({ where: { identifier } });
    
        if (deletedTrip === 0) return new TripNotFoundError();
    
        return deletedTrip;
    }
    
    async findOne(identifier: string): Promise<Trip | TripNotFoundError> {
        const trip = await TripModel.findByPk(identifier, {
        include: [UserModel, BikeModel],
        });
    
        if (!trip) return new TripNotFoundError();
    
        return Trip.fromSequelizeModel(trip);
    }
    
    async findAll(): Promise<Trip[]> {
        const trips = await TripModel.findAll({
        include: [UserModel, BikeModel],
        });
    
        return trips.map((trip: TripModel) => Trip.fromSequelizeModel(trip));
    }
}
