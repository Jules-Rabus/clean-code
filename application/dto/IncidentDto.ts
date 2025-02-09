import Incident from "@app/domain/entities/Incident";

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

export class IncidentDto implements Partial<Incident> {
  readonly identifier: string;

  @ApiProperty({ example: "2021-01-01" })
  @IsDateString()
  readonly date: Date;

  @ApiProperty({ example: "Front wheel puncture" })
  @IsString()
  @MinLength(3)
  readonly description: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly isResolved: boolean;

  @ApiProperty({ example: "1HGCM82633A004352" })
  @Matches(VinIdentifier.REGEX)
  readonly bikeVin: string;
}

export class UpdateIncidentDto implements Partial<Incident> {
  @ApiProperty({ example: "2021-01-01" })
  @IsDateString()
  @IsOptional()
  readonly date?: Date;

  @ApiProperty({ example: "Front wheel puncture" })
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly isResolved?: boolean;

  @ApiProperty({ example: "1HGCM82633A004352" })
  @Matches(VinIdentifier.REGEX)
  @IsOptional()
  readonly bikeVin?: string;
}
