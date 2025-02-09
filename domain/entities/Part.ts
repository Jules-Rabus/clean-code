import PartModel from "@app/sequelize/models/Part";

export default class Part {
  public constructor(
    public identifier: string,
    public reference: string,
    public name: string,
    public description: string,
    public stockQuantity: number,
    public minStockLevel: number,
    public price: number,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static fromSequelizeModel(sequelizeParts: PartModel): Part {
    return new Part(
      sequelizeParts.identifier,
      sequelizeParts.reference,
      sequelizeParts.name,
      sequelizeParts.description,
      sequelizeParts.stockQuantity,
      sequelizeParts.minStockLevel,
      sequelizeParts.price,
      sequelizeParts.createdAt,
      sequelizeParts.updatedAt,
    );
  }
}
