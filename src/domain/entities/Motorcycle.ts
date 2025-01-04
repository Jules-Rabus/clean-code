import { Maintenance } from "./Maintenance";
import { Incident } from "./Incident";
import { Driver } from "./Driver";
import { immatriculationIdentifier } from "../value-objects/immatriculationIdentifier";

export interface MotorcycleInterface {
  immatriculation: immatriculationIdentifier;
  model: string;
  manufacturer: string;
  kilometerInterval: number;
  maintenances: Maintenance[];
  incidents: Incident[];
  currentDriver: Driver;
}
  
export class Motorcycle {
  constructor(
    public immatriculation: immatriculationIdentifier,
    public model: string,
    public manufacturer: string,
    public kilometerInterval: number,
    public maintenances: Maintenance[],
    public incidents: Incident[],
    public currentDriver: Driver,
  ) {}
}
  