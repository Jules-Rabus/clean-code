
import BikeModel from "@app/sequelize/models/Bike";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";
import Maintenance from "@app/domain/entities/Maintenance";

export default class Bike {
    public constructor(
        public vin: VinIdentifier,
        public brand: string,
        public model: string,
        public mileage: number,
        public purchaseDate: Date,
        public warrantyExpirationDate: Date,
        public isActive: boolean,
        public isDecommissioned: boolean,
        public maintenances: Maintenance[],
        public createdAt: Date,
        public updatedAt: Date,
    ) {}

    static fromSequelizeModel(sequelizeBike: BikeModel): Bike {
        return new Bike(
            new VinIdentifier(sequelizeBike.vin),
            sequelizeBike.brand,
            sequelizeBike.model,
            sequelizeBike.mileage,
            sequelizeBike.purchaseDate,
            sequelizeBike.warrantyExpirationDate,
            sequelizeBike.isActive,
            sequelizeBike.isDecommissioned,
            sequelizeBike.maintenances.map((maintenance) => Maintenance.fromSequelizeModel(maintenance)),
            sequelizeBike.createdAt,
            sequelizeBike.updatedAt,
        );
    }

    /*static toDomain(prismaBike: PrismaBike): Bike {
        return new Bike(
            prismaBike.id,
            prismaBike.name,
            prismaBike.brand,
            prismaBike.model,
            prismaBike.price,
            prismaBike.isActive,
            prismaBike.createdAt,
            prismaBike.updatedAt,
        );
    }

    static toPrisma(domainBike: Bike): PrismaBike {
        return {
            id: domainBike.id,
            name: domainBike.name,
            brand: domainBike.brand,
            model: domainBike.model,
            price: domainBike.price,
            isActive: domainBike.isActive,
            createdAt: domainBike.createdAt,
            updatedAt: domainBike.updatedAt,
        };
    }*/
}