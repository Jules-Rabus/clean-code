import UserModel from "@app/sequelize/models/User";

export default class User {
    public constructor(
        public identifier: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public password: string,
        public roles: string[],
        public isActive: boolean,
        public isEmailVerified: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}

    static fromSequelizeModel(sequelizeUser: UserModel): User {
        return new User(
            sequelizeUser.id,
            sequelizeUser.email,
            sequelizeUser.firstName,
            sequelizeUser.lastName,
            sequelizeUser.password,
            sequelizeUser.roles,
            sequelizeUser.isActive,
            sequelizeUser.isEmailVerified,
            sequelizeUser.createdAt,
            sequelizeUser.updatedAt,
        );
    }
}