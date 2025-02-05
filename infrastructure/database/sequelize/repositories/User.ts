import { Op } from "sequelize";

import UsersRepository from "@app/domain/repositories/UsersRepository";
import UserModel from "@app/sequelize/models/User";
import UserNotFoundError from "@app/domain/errors/bikes/UserNotFoundError";

import User from "@app/domain/entities/User";

export default class SequelizeUserRepository implements UsersRepository {

    async create(user: User): Promise<User> {
        const newUser = await UserModel.create(user);

        return User.fromSequelizeModel(newUser);
    }

    async update(identifier: string, user: Partial<User>): Promise<User | null> {
        const userToUpdate = await UserModel.findByPk(identifier);

        if(!userToUpdate) throw new UserNotFoundError();

        await userToUpdate.update(user);

        return User.fromSequelizeModel(userToUpdate);
    }

    async remove(identifier: string): Promise<void> {
        const user = await UserModel.findByPk(identifier);

        if(!user) throw new UserNotFoundError();

        await user.destroy();
    }

    async findOne(identifier: string): Promise<User | null> {
        const user = await UserModel.findByPk(identifier);

        if(!user) throw new UserNotFoundError();

        return User.fromSequelizeModel(user);
    }

    async findAll(): Promise<User[]> {
        const users = await UserModel.findAll();

        return users.map((user) => User.fromSequelizeModel(user));
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({
            where: {
                email
            }
        });

        if(!user) throw new UserNotFoundError();

        return User.fromSequelizeModel(user);
    }

    async searchByEmail(email: string): Promise<User[]> {
        const users = await UserModel.findAll({
            where: {
                email: {
                    [Op.like]: `%${email}%`
                }
            }
        });

        return users.map((user) => User.fromSequelizeModel(user));
    }

}

