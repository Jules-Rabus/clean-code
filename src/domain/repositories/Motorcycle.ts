import { Motorcycle } from "../entities/Motorcycle";
import { immatriculationIdentifier } from "../value-objects/immatriculationIdentifier";

export interface MotorcycleRepositoryInterface {
  add(motorcycle: Motorcycle): Promise<void>;
  remove(immatriculation: immatriculationIdentifier): Promise<void>;
  update(immatriculation: immatriculationIdentifier, motorcycle: Partial<Motorcycle>): Promise<void>;
  getAll(): Promise<Motorcycle[]>;
  getOne(immatriculation: immatriculationIdentifier): Promise<Motorcycle | null>;
}
