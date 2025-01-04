export interface MaintenanceInterface {
    id?: number;
    type: MaintenanceType;
    startDate: Date;
    endDate: Date;
    kilometers: number;
    price: number;
}

export enum MaintenanceType {
    OIL_CHANGE = 'OIL_CHANGE',
    TIRE_CHANGE = 'TIRE_CHANGE',
    CHAIN_CHANGE = 'CHAIN_CHANGE',
    REVISION = 'REVISION',
    OTHER = 'OTHER',
}

export class Maintenance {
    constructor(
        public type: MaintenanceType,
        public startDate: Date,
        public endDate: Date,
        public kilometers: number,
        public price: number,
        public id?: number,
    ) {}
}