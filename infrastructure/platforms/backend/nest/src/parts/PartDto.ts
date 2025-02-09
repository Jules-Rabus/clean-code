import Part from "@app/domain/entities/Part";

import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString, Min } from "class-validator";

export class PartDto implements Partial<Part> {
  readonly identifier: string;

  @ApiProperty({ example: "2021-01-01" })
  @IsDateString()
  readonly date: Date;

  @ApiProperty({ example: "Front wheel" })
  @IsString()
  declare readonly name: string;

  @ApiProperty({ example: "145xba" })
  @IsString()
  declare readonly reference: string;

  @ApiProperty({ example: "Front wheel for a bike" })
  @IsString()
  declare readonly description: string;

  @ApiProperty({ example: 10 })
  @Min(0)
  declare readonly stockQuantity: number;

  @ApiProperty({ example: 5 })
  @Min(0)
  declare readonly minStockLevel: number;

  @ApiProperty({ example: 10.5 })
  declare readonly price: number;
}

export class UpdatePartDto implements Partial<Part> {
  @ApiProperty({ example: "2021-01-01" })
  @IsDateString()
  @IsOptional()
  readonly date?: Date;

  @ApiProperty({ example: "Front wheel" })
  @IsString()
  @IsOptional()
  declare readonly name?: string;

  @ApiProperty({ example: "145xba" })
  @IsString()
  @IsOptional()
  declare readonly reference?: string;

  @ApiProperty({ example: "Front wheel for a bike" })
  @IsString()
  @IsOptional()
  declare readonly description?: string;

  @ApiProperty({ example: 10 })
  @Min(0)
  @IsOptional()
  declare readonly stockQuantity?: number;

  @ApiProperty({ example: 5 })
  @Min(0)
  @IsOptional()
  declare readonly minStockLevel?: number;

  @ApiProperty({ example: 10.5 })
  @IsOptional()
  declare readonly price?: number;
}
