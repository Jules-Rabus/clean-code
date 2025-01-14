import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import Bike from '@app/domain/entities/Bike';
import VinIdentifier from '@app/domain/value-objects/VinIdentifier';
import CreateBikeUseCase from '@app/application/useCases/bikes/CreateBikeUseCase';
import RemoveBikeUseCase from '@app/application/useCases/bikes/RemoveBikeUseCase';
import UpdateBikeUseCase from '@app/application/useCases/bikes/UpdateBikeUseCase';
import FindOneBikeUseCase from '@app/application/useCases/bikes/FindOneBikeUseCase';
import FindAllBikeUseCase from '@app/application/useCases/bikes/FindAllBikeUseCase';

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
  async create(@Body() bike: Bike) {
    return this.CreateBikeUseCase.execute(bike);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() bike: Partial<Bike>) {
    const vin = new VinIdentifier(id);
    return this.UpdateBikeUseCase.execute(vin, bike);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const vin = new VinIdentifier(id);
    return this.RemoveBikeUseCase.execute(vin);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vin = new VinIdentifier(id);
    return this.FindOneBikeUseCase.execute(vin);
  }

  @Get()
  async findAll() {
    return this.FindAllBikeUseCase.execute();
  }

}
