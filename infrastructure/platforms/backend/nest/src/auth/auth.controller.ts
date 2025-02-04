
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { signInDto } from './signInDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: signInDto })
  signIn(@Body() signInDto: signInDto): Promise<string> {
    console.log(signInDto);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
