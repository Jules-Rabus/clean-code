import { Controller, Get, Post, HttpStatus, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import CreateIncidentUseCase from '@app/application/useCases/incidents/CreateIncidentUseCase';
import RemoveIncidentUseCase from '@app/application/useCases/incidents/RemoveIncidentUseCase';
import UpdateIncidentUseCase from '@app/application/useCases/incidents/UpdateIncidentUseCase';
import FindOneIncidentUseCase from '@app/application/useCases/incidents/FindOneIncidentUseCase';
import FindAllIncidentUseCase from '@app/application/useCases/incidents/FindAllIncidentUseCase';
import SearchByBikeUseCase from '@app/application/useCases/incidents/SearchByBikeUseCase';
import { IncidentDto, UpdateIncidentDto } from './IncidentDto';
import IncidentNotFoundError from '@app/domain/errors/incidents/IncidentNotFoundError';

@Controller('incidents')
@ApiBearerAuth()
export class IncidentsController {
  
    constructor(
        private readonly CreateIncidentUseCase: CreateIncidentUseCase,
        private readonly RemoveIncidentUseCase: RemoveIncidentUseCase,
        private readonly UpdateIncidentUseCase: UpdateIncidentUseCase,
        private readonly FindOneIncidentUseCase: FindOneIncidentUseCase,
        private readonly FindAllIncidentUseCase: FindAllIncidentUseCase,
        private readonly SearchByBikeUseCase: SearchByBikeUseCase,
    ) {}

    @Post()
    @ApiProperty({type: IncidentDto})
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    async create(@Body() incident: IncidentDto, @Res() response: Response) {
        const createdIncident = await this.CreateIncidentUseCase.execute(incident);
        return response.status(HttpStatus.CREATED).json(createdIncident);
    }

    @Patch(':id')
    @ApiNotFoundResponse({ description: 'Incident not found.' })
    @ApiBody({type: IncidentDto})
    @ApiResponse({type: IncidentDto, status: HttpStatus.OK})
    async update(@Param('id') identifier: string, @Body() incident: UpdateIncidentDto, @Res() response: Response) {
        try {
            const updatedIncident = await this.UpdateIncidentUseCase.execute(identifier, incident);
            return response.status(HttpStatus.OK).json(updatedIncident);
        } catch (error) {
            if (error instanceof IncidentNotFoundError) return response.sendStatus(HttpStatus.NOT_FOUND);
            
            throw error;
        }
    }

    @Delete(':id')
    @ApiNotFoundResponse({ description: 'Incident not found.' })
    @ApiResponse({ description: 'Incident removed', status: HttpStatus.NO_CONTENT })
    async remove(@Param('id') identifier: string, @Res() response: Response) {
        try {
            await this.RemoveIncidentUseCase.execute(identifier);
            return response.status(HttpStatus.NO_CONTENT);
        } catch (error) {
            if (error instanceof IncidentNotFoundError) return response.sendStatus(HttpStatus.NOT_FOUND);
            
            throw error;
        }
    }

    @Get(':id')
    @ApiResponse({type: IncidentDto, status: HttpStatus.OK})
    @ApiNotFoundResponse({ description: 'Incident not found.' })
    async findOne(@Param('id') identifier: string, @Res() response: Response) {
        try {
            const incident = await this.FindOneIncidentUseCase.execute(identifier);
            return response.status(HttpStatus.OK).json(incident);
        } catch (error) {
            if (error instanceof IncidentNotFoundError) return response.sendStatus(HttpStatus.NOT_FOUND);
            
            throw error;
        }
    }

    @Get()
    @ApiResponse({type: IncidentDto, status: HttpStatus.OK, isArray: true})
    async findAll() {
        return this.FindAllIncidentUseCase.execute();
    }

    @Get('searchByBike/:vin')
    @ApiResponse({type: IncidentDto, status: HttpStatus.OK, isArray: true})
    async searchByBike(@Param('vin') vin: string) {
        return this.SearchByBikeUseCase.execute(vin);
    }
}