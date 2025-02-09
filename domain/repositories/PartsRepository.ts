import Part from "@app/domain/entities/Part";
import PartNotFoundError from "../errors/parts/PartNotFoundError";

export default interface PartsRepository {
  create(part: Part): Promise<Part>;
  update(
    identifier: string,
    part: Partial<Part>,
  ): Promise<Part | PartNotFoundError>;
  remove(identifier: string): Promise<number | PartNotFoundError>;
  findOne(identifier: string): Promise<Part | PartNotFoundError>;
  findAll(): Promise<Part[]>;
  searchByReference(reference: string): Promise<Part[]>;
}
