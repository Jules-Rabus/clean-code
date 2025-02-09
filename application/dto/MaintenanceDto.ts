import Maintenance from "@app/domain/entities/Maintenance";

import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from "class-validator";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";

export class MaintenanceDto implements Partial<Maintenance> {
  readonly identifier: string;

  @ApiProperty({ example: "Change oil" })
  @IsString()
  @MinLength(3)
  public readonly title: string;

  @ApiProperty({ example: "Change oil with synthetic oil due to high mileage" })
  @IsString()
  @MinLength(3)
  public readonly description: string;

  @ApiProperty({ example: "2021-04-20" })
  @IsDateString()
  public readonly startDate: Date;

  @ApiProperty({ example: "2021-04-24" })
  @IsDateString()
  public readonly endDate: Date;

  @ApiProperty()
  @IsBoolean()
  public readonly isDone: boolean;

  @ApiProperty({ example: "1HGCM82633A004352" })
  @IsOptional()
  @IsString()
  @Matches(VinIdentifier.REGEX)
  public readonly bikeVin: string;
}

export class UpdateMaintenanceDto implements Partial<Maintenance> {
  @ApiProperty({ example: "Change oil" })
  @IsOptional()
  @IsString()
  @MinLength(1)
  public readonly title: string;

  @ApiProperty({ example: "Change oil with synthetic oil due to high mileage" })
  @IsOptional()
  @IsString()
  @MinLength(1)
  public readonly description: string;

  @ApiProperty({ example: "2021-04-20" })
  @IsOptional()
  @IsDateString()
  public readonly startDate: Date;

  @ApiProperty({ example: "2021-04-24" })
  @IsOptional()
  @IsDateString()
  public readonly endDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  public readonly isDone: boolean;

  @ApiProperty({ example: "1HGCM82633A004352" })
  @IsOptional()
  @IsString()
  @Matches(VinIdentifier.REGEX)
  public readonly bikeVin: string;
}
