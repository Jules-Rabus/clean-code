import Bike from "@app/domain/entities/Bike";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";
import BikeNotFoundError from "../errors/bikes/BikeNotFoundError";

export default interface BikesRepository {
  create(bike: Bike): Promise<Bike>;
  update(
    vin: VinIdentifier,
    bike: Partial<Bike>,
  ): Promise<Bike | BikeNotFoundError>;
  remove(vin: VinIdentifier): Promise<number | BikeNotFoundError>;
  findOne(vin: VinIdentifier): Promise<Bike | BikeNotFoundError>;
  findAll(): Promise<Bike[]>;
  searchByVin(vin: VinIdentifier): Promise<Bike[]>;
  searchByModel(model: string): Promise<Bike[]>;
}
