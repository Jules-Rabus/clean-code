export default class User {
    public constructor(
        public id: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public password: string,
        public roles: string[],
        public isActive: boolean,
        public isEmailVerified: boolean,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}


}