import Company from "@app/domain/entities/Company";
import CompanyNotFoundError from "../errors/companies/CompanyNotFoundError";

export default interface CompanyRepository {
  create(company: Company): Promise<Company>;
  update(
    id: string,
    company: Partial<Company>,
  ): Promise<Company | CompanyNotFoundError>;
  remove(id: string): Promise<number | CompanyNotFoundError>;
  findOne(id: string): Promise<Company | CompanyNotFoundError>;
  findAll(): Promise<Company[]>;
  searchByName(name: string): Promise<Company[]>;
}
