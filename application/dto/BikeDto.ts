import Bike from "@app/domain/entities/Bike";
import Incident from "@app/domain/entities/Incident";
import Maintenance from "@app/domain/entities/Maintenance";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
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

  @ApiProperty({ example: "AB123CD" })
  @IsString()
  readonly registrationNumber: string;

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

  @ApiProperty({ type: Maintenance, isArray: true, example: [] })
  readonly maintenances: Maintenance[];

  @ApiProperty({ type: Incident, isArray: true, example: [] })
  readonly incidents: Incident[];
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

  @ApiProperty({ example: "AB123CD" })
  @IsString()
  @IsOptional()
  readonly registrationNumber: string;

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
