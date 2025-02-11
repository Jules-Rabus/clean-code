import SequelizeUserRepository from "@app/sequelize/repositories/User";
import Bike from "./Bike";
import User from "./User";
import SequelizeBikeRepository from "@app/sequelize/repositories/Bike";
import BikeNotFoundError from "../errors/bikes/BikeNotFoundError";
import VinIdentifier from "../value-objects/VinIdentifier";
import UserNotFoundError from "../errors/users/UserNotFoundError";

export default class Company {
  constructor(
    public readonly identifier: string,
    public readonly name: string,
    public readonly email: string,
    public readonly address: string,
    public readonly phone: string,
    public readonly bikes?: Bike[] | string[],
    public readonly users?: User[] | string[],
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static async fromMongoModel(
    mongoCompany: any,
    userRepository: SequelizeUserRepository,
    bikeRepository: SequelizeBikeRepository,
    _includeRelations: boolean = true,
  ): Promise<Company> {
    return new Company(
      mongoCompany.identifier,
      mongoCompany.name,
      mongoCompany.email,
      mongoCompany.address,
      mongoCompany.phone,
      mongoCompany.bikes && _includeRelations
        ? await this.findBikes(mongoCompany.bikes, bikeRepository)
        : mongoCompany.bikes,
      mongoCompany.users && _includeRelations
        ? await this.findUsers(mongoCompany.users, userRepository)
        : mongoCompany.users,
      mongoCompany.createdAt,
      mongoCompany.updatedAt,
    );
  }

  static async findBikes(
    bikeIdentifiers: string[],
    bikeRepository: SequelizeBikeRepository,
  ): Promise<Bike[]> {
    return await Promise.all(
      bikeIdentifiers.map(async (bikeIdentifier) => {
        const vin = new VinIdentifier(bikeIdentifier);
        const bike = await bikeRepository.findOne(vin);

        if (bike instanceof BikeNotFoundError) {
          throw new BikeNotFoundError();
        }

        return bike;
      }),
    );
  }

  static async findUsers(
    userIdentifiers: string[],
    userRepository: SequelizeUserRepository,
  ): Promise<User[]> {
    return await Promise.all(
      userIdentifiers.map(async (userIdentifier) => {
        const user = await userRepository.findOne(userIdentifier);

        if (user instanceof UserNotFoundError) {
          throw new UserNotFoundError();
        }

        return user;
      }),
    );
  }
}
