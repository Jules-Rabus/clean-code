import { Driver } from './Driver';

export interface RentInterface {
    id?: number
    startDate: Date;
    endDate: Date;
    price: number;
    driver: Driver;
}

export class Rent {
    constructor(
        public startDate: Date,
        public endDate: Date,
        public price: number,
        public driver: Driver,
        public id?: number,
    ) {}
}