import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { signInDto } from "@app/application/dto/signInDto";
import { Public } from "./decorators/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiBody({ type: signInDto })
  signIn(@Body() signInDto: signInDto): Promise<string> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  @ApiBearerAuth()
  // @ts-ignore
  getProfile(@Request() request) {
    return request.user;
  }
}
