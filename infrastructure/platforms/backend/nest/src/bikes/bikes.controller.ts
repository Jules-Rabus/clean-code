import { Controller, Get, Res, HttpStatus, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Response } from 'express';


import VinIdentifier from '@app/domain/value-objects/VinIdentifier';
import CreateBikeUseCase from '@app/application/useCases/bikes/CreateBikeUseCase';
import RemoveBikeUseCase from '@app/application/useCases/bikes/RemoveBikeUseCase';
import UpdateBikeUseCase from '@app/application/useCases/bikes/UpdateBikeUseCase';
import FindOneBikeUseCase from '@app/application/useCases/bikes/FindOneBikeUseCase';
import FindAllBikeUseCase from '@app/application/useCases/bikes/FindAllBikeUseCase';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { BikeDto } from './BikeDto';
import BikeNotFoundError from '@app/domain/errors/bikes/BikeNotFoundError';

@Controller('bikes')
@ApiBearerAuth()
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
  async create(@Body() bike: BikeDto, @Res() response: Response) {
    const createdBike = await this.CreateBikeUseCase.execute(bike);
    return response.status(HttpStatus.CREATED).json(createdBike);
  }

  @Patch(':id')
  @ApiNotFoundResponse({ description: 'Bike not found.' })
  @ApiBody({type: BikeDto})
  @ApiResponse({type: BikeDto, status: HttpStatus.OK})
  async update(@Param('id') identifier: string, @Body() bike: Partial<BikeDto>, @Res() response: Response) {
    try {
      const vin = new VinIdentifier(identifier);
      const updatedBike = await this.UpdateBikeUseCase.execute(vin, bike);
      return updatedBike;
    } catch (error) {
      if (error instanceof BikeNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Bike not found.' })
  @ApiResponse({ description: 'Bike removed', status: HttpStatus.NO_CONTENT })
  async remove(@Param('id') identifier: string, @Res() response: Response) {
    try {
      const vin = new VinIdentifier(identifier);
      await this.RemoveBikeUseCase.execute(vin);
      return response.status(HttpStatus.NO_CONTENT);
    } catch (error) {
      if (error instanceof BikeNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Get(':id')
  @ApiResponse({type: BikeDto, status: HttpStatus.OK})
  @ApiNotFoundResponse({ description: 'Bike not found.' })
  async findOne(@Param('id') identifier: string, @Res() response: Response) {
    try {
      const vin = new VinIdentifier(identifier);
      const bike = await this.FindOneBikeUseCase.execute(vin);
      return bike;
    } catch (error) {
      if (error instanceof BikeNotFoundError) {
        return response.sendStatus(HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }
    

  @Get()
  @ApiResponse({type: BikeDto, isArray: true, status: 200})
  async findAll() {
    return this.FindAllBikeUseCase.execute();
  }

}
