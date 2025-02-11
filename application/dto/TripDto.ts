import Trip from "@app/domain/entities/Trip";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";

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

export class TripDto implements Partial<Trip> {
  readonly identifier: string;

  @ApiProperty({ example: "2021-01-01" })
  @IsDateString()
  readonly startDate: Date;

  @ApiProperty({ example: "2021-01-04" })
  @IsDateString()
  readonly endDate: Date;

  @ApiProperty({ example: "66d4e6a8-c3a9-4015-8279-5f96e5108f53" })
  @IsUUID(4)
  public readonly userId?: string;

  @ApiProperty({ example: "1HGCM82633A004352" })
  @Matches(VinIdentifier.REGEX)
  readonly bikeVin: string;
}

export class UpdateTripDto implements Partial<Trip> {
  @ApiProperty({ example: "2021-01-01" })
  @IsDateString()
  @IsOptional()
  readonly startDate?: Date;

  @ApiProperty({ example: "2021-01-04" })
  @IsDateString()
  @IsOptional()
  readonly endDate?: Date;

  @ApiProperty({ example: "66d4e6a8-c3a9-4015-8279-5f96e5108f53" })
  @IsUUID(4)
  @IsOptional()
  readonly userId?: string;

  @ApiProperty({ example: "1HGCM82633A004352" })
  @Matches(VinIdentifier.REGEX)
  @IsOptional()
  readonly bikeVin?: string;
}
