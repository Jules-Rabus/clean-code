import { LoginUseCase } from '@app/application/useCases/LoginUseCase';
import PasswordService from '@app/application/services/PasswordService';
import AuthenticationService from '@app/application/services/AuthenticationService';
import SequelizeUserRepository from '@app/sequelize/repositories/User';

export const LoginUseCaseProvider = {
    provide: LoginUseCase,
    useFactory: (passwordService: PasswordService, authenticationService: AuthenticationService, userRepository: SequelizeUserRepository) => new LoginUseCase(passwordService, authenticationService, userRepository),
    inject: [PasswordService, AuthenticationService, SequelizeUserRepository],
};

export default [
    LoginUseCaseProvider,
    PasswordService,
    AuthenticationService,
    SequelizeUserRepository,
];