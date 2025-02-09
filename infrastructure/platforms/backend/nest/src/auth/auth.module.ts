import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import authProvider from "./auth.provider";
import { APP_GUARD } from "@nestjs/core";

@Module({
  providers: [
    AuthService,
    ...authProvider,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
