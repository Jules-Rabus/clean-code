
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { LoginUseCase } from '@app/application/useCases/LoginUseCase';
import PasswordService from '@app/application/services/PasswordService';
import AuthenticationService from '@app/application/services/AuthenticationService';
import SequelizeUserRepository from '@app/sequelize/repositories/User';


@Module({
  providers: [
    AuthService,
    LoginUseCase,
    PasswordService,
    AuthenticationService,
    SequelizeUserRepository,
],
  controllers: [AuthController],
})
export class AuthModule {}
