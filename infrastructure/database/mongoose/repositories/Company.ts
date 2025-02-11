import Company from "@app/domain/entities/Company";
import CompanyRepository from "@app/domain/repositories/CompanyRepository";
import { CompanyModel } from "../models/Company";
import CompanyNotFoundError from "@app/domain/errors/companies/CompanyNotFoundError";
import SequelizeBikeRepository from "@app/sequelize/repositories/Bike";
import SequelizeUserRepository from "@app/sequelize/repositories/User";

export default class MongooseCompanyRepository implements CompanyRepository {
  public async create(company: Company): Promise<Company> {
    const newCompany = await CompanyModel.create(company);

    return Company.fromMongoModel(
      newCompany,
      new SequelizeUserRepository(),
      new SequelizeBikeRepository(),
    );
  }

  public async update(
    identifier: string,
    company: Partial<Company>,
  ): Promise<Company | CompanyNotFoundError> {
    const updatedCompany = await CompanyModel.findOneAndUpdate(
      { identifier },
      company,
      { new: true },
    );

    if (!updatedCompany) {
      return new CompanyNotFoundError();
    }

    return Company.fromMongoModel(
      updatedCompany,
      new SequelizeUserRepository(),
      new SequelizeBikeRepository(),
    );
  }

  public async remove(
    identifier: string,
  ): Promise<number | CompanyNotFoundError> {
    const deletedCompany = await CompanyModel.deleteOne({ identifier });

    if (!deletedCompany || deletedCompany.deletedCount === 0) {
      return new CompanyNotFoundError();
    }

    return deletedCompany.deletedCount;
  }

  public async findOne(
    identifier: string,
  ): Promise<Company | CompanyNotFoundError> {
    const company = await CompanyModel.findOne({ identifier });

    if (!company) {
      return new CompanyNotFoundError();
    }

    return Company.fromMongoModel(
      company,
      new SequelizeUserRepository(),
      new SequelizeBikeRepository(),
    );
  }

  public async findAll(): Promise<Company[]> {
    const companies = await CompanyModel.find();

    return await Promise.all(
      companies.map(async (company) =>
        Company.fromMongoModel(
          company,
          new SequelizeUserRepository(),
          new SequelizeBikeRepository(),
        ),
      ),
    );
  }

  public async searchByName(name: string): Promise<Company[]> {
    const companies = await CompanyModel.find({
      name: { $regex: name, $options: "i" },
    });

    return await Promise.all(
      companies.map(async (company) =>
        Company.fromMongoModel(
          company,
          new SequelizeUserRepository(),
          new SequelizeBikeRepository(),
        ),
      ),
    );
  }
}
