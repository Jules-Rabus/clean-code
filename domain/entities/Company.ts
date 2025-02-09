import Bike from "./Bike";

export default class Company {
  constructor(
    public readonly identifier: string,
    public readonly name: string,
    public readonly email: string,
    public readonly address: string,
    public readonly phone: string,
    public readonly bikes?: Partial<Bike>[],
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static fromMongoModel(
    mongoCompany: any,
    _includeRelations: boolean = true,
  ): Company {
    return new Company(
      mongoCompany.identifier,
      mongoCompany.name,
      mongoCompany.email,
      mongoCompany.address,
      mongoCompany.phone,
      [], // TODO: Implement bikes
      mongoCompany.createdAt,
      mongoCompany.updatedAt,
    );
  }
}
