import { Driver } from './Driver';

export interface IncidentInterface {
    id?: number;
    type: IncidentType;
    date: Date;
    kilometers: number;
    price: number;
    driver: Driver;
}

export enum IncidentType {
    ACCIDENT = 'ACCIDENT',
    THEFT = 'THEFT',
    BREAKDOWN = 'BREAKDOWN',
    INFRACTION = 'INFRACTION',
    OTHER = 'OTHER',
}

export class Incident {
    constructor(
        public type: IncidentType,
        public date: Date,
        public kilometers: number,
        public price: number,
        public driver: Driver,
        public id?: number,
    ) {}
}