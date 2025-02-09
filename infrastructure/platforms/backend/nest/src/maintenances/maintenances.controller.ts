import {
  Controller,
  Get,
  Post,
  HttpStatus,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiProperty,
  ApiResponse,
} from "@nestjs/swagger";
import { Response } from "express";

import CreateMaintenanceUseCase from "@app/application/useCases/maintenances/CreateMaintenanceUseCase";
import RemoveMaintenanceUseCase from "@app/application/useCases/maintenances/RemoveMaintenanceUseCase";
import UpdateMaintenanceUseCase from "@app/application/useCases/maintenances/UpdateMaintenanceUseCase";
import FindOneMaintenanceUseCase from "@app/application/useCases/maintenances/FindOneMaintenanceUseCase";
import FindAllMaintenanceUseCase from "@app/application/useCases/maintenances/FindAllMaintenanceUseCase";
import SearchByBikeUseCase from "@app/application/useCases/maintenances/SearchByBikeUseCase";
import {
  MaintenanceDto,
  UpdateMaintenanceDto,
} from "@app/application/dto/MaintenanceDto";

@Controller("maintenances")
@ApiBearerAuth()
export class MaintenancesController {
  constructor(
    private readonly createMaintenanceUseCase: CreateMaintenanceUseCase,
    private readonly removeMaintenanceUseCase: RemoveMaintenanceUseCase,
    private readonly updateMaintenanceUseCase: UpdateMaintenanceUseCase,
    private readonly findOneMaintenanceUseCase: FindOneMaintenanceUseCase,
    private readonly findAllMaintenanceUseCase: FindAllMaintenanceUseCase,
    private readonly searchByBikeUseCase: SearchByBikeUseCase,
  ) {}

  @Post()
  @ApiProperty({ type: MaintenanceDto })
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
  })
  async create(@Body() maintenance: MaintenanceDto, @Res() response: Response) {
    const createdMaintenance =
      await this.createMaintenanceUseCase.execute(maintenance);
    return response.status(HttpStatus.CREATED).json(createdMaintenance);
  }

  @Patch(":id")
  @ApiNotFoundResponse({ description: "Maintenance not found." })
  @ApiBody({ type: UpdateMaintenanceDto })
  @ApiResponse({ type: MaintenanceDto, status: HttpStatus.OK })
  async update(
    @Param("id") identifier: string,
    @Body() maintenance: UpdateMaintenanceDto,
  ) {
    return await this.updateMaintenanceUseCase.execute(identifier, maintenance);
  }

  @Get()
  @ApiResponse({ type: MaintenanceDto, status: HttpStatus.OK })
  async findAll() {
    return await this.findAllMaintenanceUseCase.execute();
  }

  @Get(":id")
  @ApiNotFoundResponse({ description: "Maintenance not found." })
  @ApiResponse({ type: MaintenanceDto, status: HttpStatus.OK })
  async findOne(@Param("id") identifier: string) {
    return await this.findOneMaintenanceUseCase.execute(identifier);
  }

  @Delete(":id")
  @ApiNotFoundResponse({ description: "Maintenance not found." })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async remove(@Param("id") identifier: string, @Res() response: Response) {
    await this.removeMaintenanceUseCase.execute(identifier);
    return response.status(HttpStatus.NO_CONTENT).json();
  }

  @Get("bike/:id")
  @ApiResponse({ type: MaintenanceDto, status: HttpStatus.OK })
  async searchByBike(@Param("id") bikeId: string) {
    return await this.searchByBikeUseCase.execute(bikeId);
  }
}
