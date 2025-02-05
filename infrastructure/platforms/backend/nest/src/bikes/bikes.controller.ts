import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import VinIdentifier from '@app/domain/value-objects/VinIdentifier';
import CreateBikeUseCase from '@app/application/useCases/bikes/CreateBikeUseCase';
import RemoveBikeUseCase from '@app/application/useCases/bikes/RemoveBikeUseCase';
import UpdateBikeUseCase from '@app/application/useCases/bikes/UpdateBikeUseCase';
import FindOneBikeUseCase from '@app/application/useCases/bikes/FindOneBikeUseCase';
import FindAllBikeUseCase from '@app/application/useCases/bikes/FindAllBikeUseCase';
import { ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { BikeDto } from './BikeDto';

@Controller('bikes')
export class BikesController {
  
  constructor(
    private readonly CreateBikeUseCase: CreateBikeUseCase,
    private readonly RemoveBikeUseCase: RemoveBikeUseCase,
    private readonly UpdateBikeUseCase: UpdateBikeUseCase,
    private readonly FindOneBikeUseCase: FindOneBikeUseCase,
    private readonly FindAllBikeUseCase: FindAllBikeUseCase,
  ) {}

  @Post()
  @ApiProperty(
    {
      type: BikeDto
    }
  )
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(@Body() bike: BikeDto) {
    return this.CreateBikeUseCase.execute(bike);
  }

  @Patch(':id')
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Bike not found.' })
  @ApiBody({type: BikeDto})
  @ApiResponse({type: BikeDto, status: 200})
  async update(@Param('id') identifier: string, @Body() bike: Partial<BikeDto>) {
    const vin = new VinIdentifier(identifier);
    return this.UpdateBikeUseCase.execute(vin, bike);
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Bike not found.' })
  @ApiResponse({ description: 'Bike removed', status: 204 })
  async remove(@Param('id') identifier: string) {
    const vin = new VinIdentifier(identifier);
    return this.RemoveBikeUseCase.execute(vin);
  }

  @Get(':id')
  @ApiResponse({type: BikeDto, status: 200})
  @ApiNotFoundResponse({ description: 'Bike not found.' })
  async findOne(@Param('id') identifier: string) {
    const vin = new VinIdentifier(identifier);
    return this.FindOneBikeUseCase.execute(vin);
  }

  @Get()
  @ApiResponse({type: BikeDto, isArray: true, status: 200})
  async findAll() {
    return this.FindAllBikeUseCase.execute();
  }

}
