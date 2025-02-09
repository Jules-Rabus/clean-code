import Company from '@app/domain/entities/Company';
import VinIdentifier from '@app/domain/value-objects/VinIdentifier';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CompanyDto implements Partial<Company> {

    // TODO add to swagger
    readonly identifier: string;

    @ApiProperty({ example: 'Motorbike Inc.' })
    @IsString()
    @MinLength(3)
    readonly name: string;

    @ApiProperty({ example: 'example@example.com' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: '123 rue du motard, 17000 La Rochelle' })
    @IsString()
    readonly address: string;

    @ApiProperty({ example: '0123456789' })
    @IsString()
    readonly phone: string;

    @ApiProperty({ example: ['1HGCM82633A004352'] })
    @Matches(VinIdentifier.REGEX, { each: true })
    readonly bikesVin: string[];
}

export class UpdateCompanyDto implements Partial<Company> {

    @ApiProperty({ example: 'Motorbike Inc.' })
    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly name?: string;

    @ApiProperty({ example: 'example@example.com' })
    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @ApiProperty({ example: '123 rue du motard, 17000 La Rochelle' })
    @IsString()
    @IsOptional()
    readonly address?: string;

    @ApiProperty({ example: '0123456789' })
    @IsString()
    @IsOptional()
    readonly phone?: string;

    @ApiProperty({ example: ['1HGCM82633A004352'] })
    @Matches(VinIdentifier.REGEX, { each: true })
    @IsOptional()
    readonly bikesVin?: string[];
}
