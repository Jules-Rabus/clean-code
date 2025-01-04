export interface DriverInterface {
    email: string;
    firstName: string;
    lastName: string;
    licenseDate: Date;
}

export class Driver {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        public licenseDate: Date,
    ) {}
}