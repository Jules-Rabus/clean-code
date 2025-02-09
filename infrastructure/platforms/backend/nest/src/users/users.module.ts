import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import userProvider from "./users.provider";

import SequelizeUserRepository from "@app/sequelize/repositories/User";

@Module({
  controllers: [UsersController],
  providers: [...userProvider, SequelizeUserRepository],
})
export class UsersModule {}
