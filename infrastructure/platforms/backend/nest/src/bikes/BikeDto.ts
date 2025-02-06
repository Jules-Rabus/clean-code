import Bike from "@app/domain/entities/Bike";
import Incident from "@app/domain/entities/Incident";
import Maintenance from "@app/domain/entities/Maintenance";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsString, IsUUID, Min } from "class-validator";


export class BikeDto implements Partial<Bike> {
    
    @ApiProperty({type: String, example: '1HGCM82633A004352'})
    @IsUUID(4)
    vin: VinIdentifier;

    @ApiProperty({ example: 'Yamaha' })
    @IsString()
    brand: string;

    @ApiProperty({ example: 'R1' })
    @IsString()
    model: string;

    @ApiProperty({ example: 10000 })
    @IsNumber()
    @Min(0)
    mileage: number;

    @ApiProperty({ example: '2021-01-01' })
    @IsDateString()
    purchaseDate: Date;

    @ApiProperty({ example: '2023-01-01' })
    @IsDateString()
    warrantyExpirationDate: Date;

    @ApiProperty({ example: true })
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    isDecommissioned: boolean;

    @ApiProperty({ type: Maintenance, isArray: true, example: [] })
    maintenances: Maintenance[];

    @ApiProperty({ type: Incident, isArray: true, example: [] })
    incidents: Incident[];
}