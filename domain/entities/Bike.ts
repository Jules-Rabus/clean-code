import BikeModel from "@app/sequelize/models/Bike";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";
import Maintenance from "@app/domain/entities/Maintenance";
import Incident from "@app/domain/entities/Incident";
import Immatriculation from "../value-objects/Immatriculation";
import Trip from "./Trip";

export default class Bike {
  public constructor(
    public vin: VinIdentifier,
    public brand: string,
    public model: string,
    public mileage: number,
    public registrationNumber: Immatriculation,
    public purchaseDate: Date,
    public warrantyExpirationDate: Date,
    public isActive: boolean,
    public isDecommissioned: boolean,
    public trips: Trip[],
    public maintenances: Maintenance[],
    public incidents: Incident[],
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static fromSequelizeModel(
    sequelizeBike: BikeModel,
    _includeRelations: boolean = true,
  ): Bike {
    return new Bike(
      new VinIdentifier(sequelizeBike.vin),
      sequelizeBike.brand,
      sequelizeBike.model,
      sequelizeBike.mileage,
      new Immatriculation(sequelizeBike.registrationNumber),
      sequelizeBike.purchaseDate,
      sequelizeBike.warrantyExpirationDate,
      sequelizeBike.isActive,
      sequelizeBike.isDecommissioned,
      sequelizeBike.trips?.map((trip) =>
        Trip.fromSequelizeModel(trip, false),
      ) || [],
      sequelizeBike.maintenances?.map((maintenance) =>
        Maintenance.fromSequelizeModel(maintenance, false),
      ) || [],
      sequelizeBike.incidents?.map((incident) =>
        Incident.fromSequelizeModel(incident, false),
      ) || [],
      sequelizeBike.createdAt,
      sequelizeBike.updatedAt,
    );
  }
}
