import Incident from "@app/domain/entities/Incident";
import Trip from "@app/domain/entities/Trip";
import User from "@app/domain/entities/User";
import { Role } from "@app/domain/value-objects/Role";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlpha,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class UserDto implements Partial<User> {
  readonly identifier: string;

  @ApiProperty({ example: "example@example.com" })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: "John" })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ example: "Doe" })
  @IsNotEmpty()
  @IsAlpha("fr-FR")
  readonly lastName: string;

  @ApiProperty({ example: "P@ssw0rd" })
  readonly password: string;

  @ApiProperty({ type: String, isArray: true, example: ["user"] })
  @IsArray()
  @IsEnum(Role, { each: true })
  readonly roles: Role[];

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly isActive: boolean;

  @ApiProperty({ type: Incident, isArray: true, example: [] })
  readonly incidents: Incident[];

  @ApiProperty({ type: Trip, isArray: true, example: [] })
  readonly trips: Trip[];
}

export class UpdateUserDto implements Partial<User> {
  @ApiProperty({ example: "example@example.com" })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ example: "John" })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly firstName?: string;

  @ApiProperty({ example: "Doe" })
  @IsNotEmpty()
  @IsAlpha("fr-FR")
  @IsOptional()
  readonly lastName?: string;

  @ApiProperty({ example: "P@ssw0rd" })
  @IsOptional()
  readonly password?: string;

  @ApiProperty({ type: String, isArray: true, example: ["user"] })
  @IsArray()
  @IsEnum(Role, { each: true })
  @IsOptional()
  readonly roles?: Role[];

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly isActive?: boolean;
}
