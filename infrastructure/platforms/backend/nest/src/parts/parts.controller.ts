import { Controller, Get, Post, HttpStatus, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import CreatePartUseCase from '@app/application/useCases/parts/CreatePartUseCase';
import RemovePartUseCase from '@app/application/useCases/parts/RemovePartUseCase';
import UpdatePartUseCase from '@app/application/useCases/parts/UpdatePartUseCase';
import FindOnePartUseCase from '@app/application/useCases/parts/FindOnePartUseCase';
import FindAllPartUseCase from '@app/application/useCases/parts/FindAllPartUseCase';
import SearchByReferenceUseCase from '@app/application/useCases/parts/SearchByReferenceUseCase';
import { PartDto, UpdatePartDto } from './PartDto';
import PartNotFoundError from '@app/domain/errors/parts/PartNotFoundError';

@Controller('parts')
@ApiBearerAuth()
export class PartsController {
  
    constructor(
        private readonly CreatePartUseCase: CreatePartUseCase,
        private readonly RemovePartUseCase: RemovePartUseCase,
        private readonly UpdatePartUseCase: UpdatePartUseCase,
        private readonly FindOnePartUseCase: FindOnePartUseCase,
        private readonly FindAllPartUseCase: FindAllPartUseCase,
        private readonly SearchByReferenceUseCase: SearchByReferenceUseCase,
    ) {}

    @Post()
    @ApiProperty({type: PartDto})
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    async create(@Body() part: PartDto, @Res() response: Response) {
        const createdPart = await this.CreatePartUseCase.execute(part);
        return response.status(HttpStatus.CREATED).json(createdPart);
    }

    @Patch(':id')
    @ApiNotFoundResponse({ description: 'Part not found.' })
    @ApiBody({type: PartDto})
    @ApiResponse({type: PartDto, status: HttpStatus.OK})
    async update(@Param('id') identifier: string, @Body() part: UpdatePartDto, @Res() response: Response) {
        try {
            const updatedPart = await this.UpdatePartUseCase.execute(identifier, part);
            return response.status(HttpStatus.OK).json(updatedPart);
        } catch (error) {
            if (error instanceof PartNotFoundError) return response.sendStatus(HttpStatus.NOT_FOUND);
            
            throw error;
        }
    }

    @Delete(':id')
    @ApiNotFoundResponse({ description: 'Part not found.' })
    @ApiResponse({ description: 'Part removed', status: HttpStatus.NO_CONTENT })
    async remove(@Param('id') identifier: string, @Res() response: Response) {
        try {
            await this.RemovePartUseCase.execute(identifier);
            return response.status(HttpStatus.NO_CONTENT);
        } catch (error) {
            if (error instanceof PartNotFoundError) return response.sendStatus(HttpStatus.NOT_FOUND);
            
            throw error;
        }
    }

    @Get(':id')
    @ApiNotFoundResponse({ description: 'Part not found.' })
    @ApiResponse({type: PartDto, status: HttpStatus.OK})
    async findOne(@Param('id') identifier: string, @Res() response: Response) {
        try {
            const part = await this.FindOnePartUseCase.execute(identifier);
            return response.status(HttpStatus.OK).json(part);
        } catch (error) {
            if (error instanceof PartNotFoundError) return response.sendStatus(HttpStatus.NOT_FOUND);
            
            throw error;
        }
    }

    @Get()
    @ApiResponse({type: PartDto, status: HttpStatus.OK})
    async findAll(@Res() response: Response) {
        const parts = await this.FindAllPartUseCase.execute();
        return response.status(HttpStatus.OK).json(parts);
    }

    @Get('searchByReference/:reference')
    @ApiResponse({type: PartDto, status: HttpStatus.OK, isArray: true})
    async searchByReference(@Param('reference') reference: string, @Res() response: Response) {
        const parts = await this.SearchByReferenceUseCase.execute(reference);
        return response.status(HttpStatus.OK).json(parts);
    }
}
