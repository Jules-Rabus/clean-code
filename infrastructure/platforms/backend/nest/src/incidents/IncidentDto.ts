import Incident from '@app/domain/entities/Incident';
import Bike from '@app/domain/entities/Bike';

import { ApiProperty } from '@nestjs/swagger';

export class IncidentDto implements Partial<Incident> {

    @ApiProperty({ example: '189b5715-9853-4271-af3c-f154ec5241d8' })
    identifier: string;

    @ApiProperty({ example: '2021-01-01' })
    date: Date;

    @ApiProperty({ example: 'Front wheel puncture' })
    description: string;

    @ApiProperty({ example: true })
    isResolved: boolean;

    @ApiProperty({ type: Bike, example: {} })
    bike: Bike;

    @ApiProperty({ example: '1HGCM82633A004352' })
    bikeVin: string;
}