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

import CreateTripUseCase from "@app/application/useCases/trips/CreateTripUseCase";
import FindOneTripUseCase from "@app/application/useCases/trips/FindOneTripUseCase";
import FindAllTripUseCase from "@app/application/useCases/trips/FindAllTripUseCase";
import RemoveTripUseCase from "@app/application/useCases/trips/RemoveTripUseCase";
import UpdateTripUseCase from "@app/application/useCases/trips/UpdateTripUseCase";

import { TripDto, UpdateTripDto } from "@app/application/dto/TripDto";

@Controller("trips")
@ApiBearerAuth()
export class TripsController {
  constructor(
    private readonly CreateTripUseCase: CreateTripUseCase,
    private readonly RemoveTripUseCase: RemoveTripUseCase,
    private readonly UpdateTripUseCase: UpdateTripUseCase,
    private readonly FindOneTripUseCase: FindOneTripUseCase,
    private readonly FindAllTripUseCase: FindAllTripUseCase,
  ) {}

  @Post()
  @ApiProperty({ type: TripDto })
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
  })
  async create(@Body() trip: TripDto, @Res() response: Response) {
    const createdTrip = await this.CreateTripUseCase.execute(trip);
    return response.status(HttpStatus.CREATED).json(createdTrip);
  }

  @Patch(":id")
  @ApiNotFoundResponse({ description: "Trip not found." })
  @ApiBody({ type: UpdateTripDto })
  @ApiResponse({ type: TripDto, status: HttpStatus.OK })
  async update(@Param("id") identifier: string, @Body() trip: UpdateTripDto) {
    return await this.UpdateTripUseCase.execute(identifier, trip);
  }

  @Get()
  @ApiResponse({ type: TripDto, status: HttpStatus.OK })
  async findAll() {
    return await this.FindAllTripUseCase.execute();
  }

  @Get(":id")
  @ApiNotFoundResponse({ description: "Trip not found." })
  @ApiResponse({ type: TripDto, status: HttpStatus.OK })
  async findOne(@Param("id") identifier: string) {
    return await this.FindOneTripUseCase.execute(identifier);
  }

  @Delete(":id")
  @ApiNotFoundResponse({ description: "Trip not found." })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async remove(@Param("id") identifier: string, @Res() response: Response) {
    await this.RemoveTripUseCase.execute(identifier);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
