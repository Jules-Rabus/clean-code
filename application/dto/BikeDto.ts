import Bike from "@app/domain/entities/Bike";
import Incident from "@app/domain/entities/Incident";
import Maintenance from "@app/domain/entities/Maintenance";
import Trip from "@app/domain/entities/Trip";
import Immatriculation from "@app/domain/value-objects/Immatriculation";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from "class-validator";

export class BikeDto implements Partial<Bike> {
  @ApiProperty({ type: String, example: "1HGCM82633A004352" })
  readonly vin: VinIdentifier;

  @ApiProperty({ example: "Yamaha" })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: "R1" })
  @IsString()
  readonly model: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  @Min(0)
  readonly mileage: number;

  @ApiProperty({ example: "AB-123-CD" })
  @IsString()
  @Matches(Immatriculation.REGEX)
  readonly registrationNumber: Immatriculation;

  @ApiProperty({ example: "2021-01-01" })
  @IsDateString()
  readonly purchaseDate: Date;

  @ApiProperty({ example: "2023-01-01" })
  @IsDateString()
  readonly warrantyExpirationDate: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly isActive: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  readonly isDecommissioned: boolean;

  @ApiProperty({ type: Trip, isArray: true, example: [], readOnly: true })
  readonly trips: Trip[];

  @ApiProperty({ type: Incident, isArray: true, example: [], readOnly: true })
  readonly incidents: Incident[];

  @ApiProperty({ type: Maintenance, isArray: true, example: [], readOnly: true })
  readonly maintenances: Maintenance[];
}

export class UpdateBikeDto implements Partial<Bike> {
  @ApiProperty({ example: "Yamaha" })
  @IsString()
  @IsOptional()
  readonly brand?: string;

  @ApiProperty({ example: "R1" })
  @IsString()
  @IsOptional()
  readonly model?: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly mileage?: number;

  @ApiProperty({ example: "AB-123-CD" })
  @IsString()
  @Matches(Immatriculation.REGEX)
  @IsOptional()
  readonly registrationNumber: Immatriculation;

  @ApiProperty({ example: "2021-01-01" })
  @IsDateString()
  @IsOptional()
  readonly purchaseDate?: Date;

  @ApiProperty({ example: "2023-01-01" })
  @IsDateString()
  @IsOptional()
  readonly warrantyExpirationDate?: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly isActive?: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  readonly isDecommissioned?: boolean;
}
