import Bike from "@app/domain/entities/Bike";
import Maintenance from "@app/domain/entities/Maintenance";
import VinIdentifier from "@app/domain/value-objects/VinIdentifier";
import { ApiProperty } from '@nestjs/swagger';


export class BikeDto implements Partial<Bike> {
    
    @ApiProperty({type: String, example: '1HGCM82633A004352'})
    vin: VinIdentifier;

    @ApiProperty({ example: 'Yamaha' })
    brand: string;

    @ApiProperty({ example: 'R1' })
    model: string;

    @ApiProperty({ example: 10000 })
    mileage: number;

    @ApiProperty({ example: '2021-01-01' })
    purchaseDate: Date;

    @ApiProperty({ example: '2023-01-01' })
    warrantyExpirationDate: Date;

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ example: false })
    isDecommissioned: boolean;

    @ApiProperty({ type: Maintenance, isArray: true, example: [] })
    maintenances: Maintenance[];
}