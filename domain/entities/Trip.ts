import TripModel from '@app/sequelize/models/Trip';
import Bike from './Bike';
import User from './User';

export default class Trip {
  public constructor(
    public identifier: string,
    public startDate: Date,
    public endDate: Date,
    public bike?: Bike,
    public user?: User,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static fromSequelizeModel(sequelizeTrips: TripModel, _includeRelations: boolean = true): Trip {
    return new Trip(
        sequelizeTrips.identifier,
        sequelizeTrips.startDate,
        sequelizeTrips.endDate,
        _includeRelations ? Bike.fromSequelizeModel(sequelizeTrips.bike, false) : undefined,
        _includeRelations ? User.fromSequelizeModel(sequelizeTrips.user) : undefined,
        sequelizeTrips.createdAt,
        sequelizeTrips.updatedAt,
    );
  }
}
