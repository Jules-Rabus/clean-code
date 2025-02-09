import { Controller, Get, Post, HttpStatus, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import CreateCompanyUseCase from '@app/application/useCases/companies/CreateCompanyUseCase';
import RemoveCompanyUseCase from '@app/application/useCases/companies/RemoveCompanyUseCase';
import UpdateCompanyUseCase from '@app/application/useCases/companies/UpdateCompanyUseCase';
import FindOneCompanyUseCase from '@app/application/useCases/companies/FindOneCompanyUseCase';
import FindAllCompanyUseCase from '@app/application/useCases/companies/FindAllCompanyUseCase';
import SearchByNameUseCase from '@app/application/useCases/companies/SearchByNameUseCase';
import { CompanyDto, UpdateCompanyDto } from './CompanyDto';

@Controller('companies')
@ApiBearerAuth()
export class CompanyController {
      
     constructor(
          private readonly CreateCompanyUseCase: CreateCompanyUseCase,
          private readonly RemoveCompanyUseCase: RemoveCompanyUseCase,
          private readonly UpdateCompanyUseCase: UpdateCompanyUseCase,
          private readonly FindOneCompanyUseCase: FindOneCompanyUseCase,
          private readonly FindAllCompanyUseCase: FindAllCompanyUseCase,
          private readonly SearchByNameUseCase: SearchByNameUseCase,
     ) {}
    
     @Post()
     @ApiProperty({type: CompanyDto})
     @ApiCreatedResponse({ description: 'The record has been successfully created.' })
     async create(@Body() company: CompanyDto, @Res() response: Response) {
          const createdCompany = await this.CreateCompanyUseCase.execute(company);
          return response.status(HttpStatus.CREATED).json(createdCompany);
     }
    
     @Patch(':id')
     @ApiNotFoundResponse({ description: 'Company not found.' })
     @ApiBody({type: UpdateCompanyDto})
     @ApiResponse({type: CompanyDto, status: HttpStatus.OK})
     async update(@Param('id') identifier: string, @Body() company: UpdateCompanyDto) {
        return await this.UpdateCompanyUseCase.execute(identifier, company);
     }
    
     @Delete(':id')
     @ApiNotFoundResponse({ description: 'Company not found.' })
     @ApiResponse({ description: 'Company removed', status: HttpStatus.NO_CONTENT })
     async remove(@Param('id') identifier: string, @Res() response: Response) {
        await this.RemoveCompanyUseCase.execute(identifier);
        return response.status(HttpStatus.NO_CONTENT).json();
     }
    
     @Get()
     @ApiResponse({type: CompanyDto, status: HttpStatus.OK})
     async findAll() {
          return await this.FindAllCompanyUseCase.execute();
     }
    
     @Get(':id')
     @ApiNotFoundResponse({ description: 'Company not found.' })
     @ApiResponse({type: CompanyDto, status: HttpStatus.OK})
     async findOne(@Param('id') identifier: string) {
        return await this.FindOneCompanyUseCase.execute(identifier);
     }

    @Get('searchByName/:name')
    async searchByName(@Param('name') name: string) {
        return await this.SearchByNameUseCase.execute(name);
    }
}