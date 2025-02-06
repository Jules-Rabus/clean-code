import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import CreateUserUseCase from '@app/application/useCases/users/CreateUserUseCase';
import RemoveUserUseCase from '@app/application/useCases/users/RemoveUserUseCase';
import UpdateUserUseCase from '@app/application/useCases/users/UpdateUserUseCase';
import FindOneUserUseCase from '@app/application/useCases/users/FindOneUserUseCase';
import FindAllUserUseCase from '@app/application/useCases/users/FindAllUserUseCase';
import SearchByEmailUserUseCase from '@app/application/useCases/users/SearchByEmailUseCase';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { UserDto, UpdateUserDto } from './UserDto';
import UserNotFoundError from '@app/domain/errors/users/UserNotFoundError';
import ValidationError from "@app/domain/errors/ValidationError";

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  
  constructor(
    private readonly CreateUserUseCase: CreateUserUseCase,
    private readonly RemoveUserUseCase: RemoveUserUseCase,
    private readonly UpdateUserUseCase: UpdateUserUseCase,
    private readonly FindOneUserUseCase: FindOneUserUseCase,
    private readonly FindAllUserUseCase: FindAllUserUseCase,
    private readonly SearchByEmailUserUseCase: SearchByEmailUserUseCase,
  ) {}

  @Post()
  @ApiProperty({type: UserDto})
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  async create(@Body() user: UserDto, @Res() response: Response) {
    try {
      const createdUser = await this.CreateUserUseCase.execute(user);
      return response.status(HttpStatus.CREATED).json(createdUser);
    }
    catch (error) {
      if (error instanceof ValidationError) return response.status(HttpStatus.BAD_REQUEST).json(error.name);
      throw error
    }
  }

  @Patch(':id')
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBody({type: UserDto})
  @ApiResponse({type: UserDto, status: HttpStatus.OK})
  async update(@Param('id') id: string, @Body() user: UpdateUserDto, @Res() response: Response) {
    try {
      const updatedUser = await this.UpdateUserUseCase.execute(id, user);
      return response.status(HttpStatus.OK).json(updatedUser);
    } catch (error) {

      if (error instanceof UserNotFoundError) return response.sendStatus(HttpStatus.NOT_FOUND);

      if (error instanceof ValidationError) return response.status(HttpStatus.BAD_REQUEST).json(error.name);

      throw error;
    }
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiResponse({ description: 'User removed', status: HttpStatus.NO_CONTENT })
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      await this.RemoveUserUseCase.execute(id);
      return response.status(HttpStatus.NO_CONTENT);
    } catch (error) {
      if (error instanceof UserNotFoundError) return response.sendStatus(HttpStatus.NOT_FOUND);

      throw error;
    }
  }

  @Get(':id')
  @ApiResponse({type: UserDto, status: HttpStatus.OK})
  @ApiNotFoundResponse({ description: 'User not found.' })
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const user = await this.FindOneUserUseCase.execute(id);
      return response.status(HttpStatus.OK).json(user);
    } catch (error) {
      if (error instanceof UserNotFoundError) return response.sendStatus(HttpStatus.NOT_FOUND);

      throw error;
    }
  }

  @Get('search/:email')
  @ApiResponse({type: UserDto, status: HttpStatus.OK})
  @ApiNotFoundResponse({ description: 'User not found.' })
  async searchByEmail(@Param('email') email: string, @Res() response: Response) {
    try {
      const user = await this.SearchByEmailUserUseCase.execute(email);
      return response.status(HttpStatus.OK).json(user);
    } catch (error) {
      if (error instanceof UserNotFoundError) return response.sendStatus(HttpStatus.NOT_FOUND);
      
      throw error;
    }
  }
  
  @Get()
  @ApiResponse({type: UserDto, isArray: true, status: HttpStatus.OK})
  async findAll() {
    return this.FindAllUserUseCase.execute();
  }

}
