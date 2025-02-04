
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import authProvider from './auth.provider';

@Module({
  providers: [AuthService, ...authProvider],
  controllers: [AuthController],
})
export class AuthModule {}
