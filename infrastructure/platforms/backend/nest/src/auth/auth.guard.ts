import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./decorators/public.decorator";
import { Request } from "express";
import AuthVerifyUseCase from "@app/application/useCases/AuthVerifyUseCase";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authVerifyUseCase: AuthVerifyUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    return true;
    /*
    if (isPublic) return true;
    
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.authVerifyUseCase.execute(token);
      request["user"] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
    */
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
