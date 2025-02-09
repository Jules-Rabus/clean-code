import { Op } from "sequelize";

import UsersRepository from "@app/domain/repositories/UsersRepository";
import UserModel from "@app/sequelize/models/User";
import UserNotFoundError from "@app/domain/errors/users/UserNotFoundError";

import User from "@app/domain/entities/User";

export default class SequelizeUserRepository implements UsersRepository {
  async create(user: User): Promise<User> {
    const newUser = await UserModel.create(user);

    return User.fromSequelizeModel(newUser);
  }

  async update(
    identifier: string,
    user: Partial<User>,
  ): Promise<User | UserNotFoundError> {
    const userToUpdate = await UserModel.findByPk(identifier);

    if (!userToUpdate) return new UserNotFoundError();

    await userToUpdate.update(user);

    return User.fromSequelizeModel(userToUpdate);
  }

  async remove(identifier: string): Promise<number | UserNotFoundError> {
    const deletedUser = await UserModel.destroy({ where: { identifier } });

    if (deletedUser === 0) return new UserNotFoundError();

    return deletedUser;
  }

  async findOne(identifier: string): Promise<User | UserNotFoundError> {
    const user = await UserModel.findByPk(identifier);

    if (!user) return new UserNotFoundError();

    return User.fromSequelizeModel(user);
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.findAll();

    return users.map((user) => User.fromSequelizeModel(user));
  }

  async findByEmail(email: string): Promise<User | UserNotFoundError> {
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });

    if (!user) return new UserNotFoundError();

    return User.fromSequelizeModel(user);
  }

  async searchByEmail(email: string): Promise<User[]> {
    const users = await UserModel.findAll({
      where: {
        email: {
          [Op.like]: `%${email}%`,
        },
      },
    });

    return users.map((user) => User.fromSequelizeModel(user));
  }
}
