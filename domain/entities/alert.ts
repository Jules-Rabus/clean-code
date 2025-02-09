import SequelizePartRepository from "@app/sequelize/repositories/Part";
import Part from "./Part";
import PartNotFoundError from "../errors/parts/PartNotFoundError";

export default class Alert {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public part?: string | Part,
    public readonly identifier?: string,
  ) {}

  static async fromMongoModel(
    mongoAlert: any,
    partRepository: SequelizePartRepository,
    _includeRelations: boolean = true,
  ): Promise<Alert> {
    return new Alert(
      mongoAlert.title,
      mongoAlert.description,
      mongoAlert.part
        ? await this.findPart(mongoAlert.part, partRepository)
        : mongoAlert.part,
      mongoAlert.identifier,
    );
  }

  static async findPart(
    partIdentifier: string,
    partRepository: SequelizePartRepository,
  ): Promise<Part> {
    console.log(partIdentifier);
    const part = await partRepository.findOne(partIdentifier);

    if (part instanceof PartNotFoundError) {
      throw new PartNotFoundError();
    }

    return part;
  }
}
