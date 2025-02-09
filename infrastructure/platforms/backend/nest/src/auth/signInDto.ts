import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class signInDto {
  @ApiProperty({ example: "example@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "P@ssw0rd" })
  password: string;
}
