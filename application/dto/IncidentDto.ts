import Incident from "@app/domain/entities/Incident";

import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
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

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @Min(0)
  readonly cost: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly isResolved: boolean;

  @ApiProperty({ example: "66d4e6a8-c3a9-4015-8279-5f96e5108f53" })
  @IsUUID(4)
  public readonly userId?: string;

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

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly cost?: number;

  @ApiProperty({ example: "66d4e6a8-c3a9-4015-8279-5f96e5108f53" })
  @IsOptional()
  @IsUUID(4)
  public readonly userId?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly isResolved?: boolean;

  @ApiProperty({ example: "1HGCM82633A004352" })
  @Matches(VinIdentifier.REGEX)
  @IsOptional()
  readonly bikeVin?: string;
}
