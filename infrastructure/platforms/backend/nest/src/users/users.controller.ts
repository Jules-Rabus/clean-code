import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import CreateUserUseCase from '@app/application/useCases/users/CreateUserUseCase';
import RemoveUserUseCase from '@app/application/useCases/users/RemoveUserUseCase';
import UpdateUserUseCase from '@app/application/useCases/users/UpdateUserUseCase';
import FindOneUserUseCase from '@app/application/useCases/users/FindOneUserUseCase';
import FindAllUserUseCase from '@app/application/useCases/users/FindAllUserUseCase';
import SearchByEmailUserUseCase from '@app/application/useCases/users/SearchByEmailUseCase';
import { ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { UserDto } from './UserDto';

@Controller('users')
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
  @ApiProperty(
    {
      type: UserDto
    }
  )
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(@Body() user: UserDto) {
    return this.CreateUserUseCase.execute(user);
  }

  @Patch(':id')
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBody({type: UserDto})
  @ApiResponse({type: UserDto, status: 200})
  async update(@Param('id') id: string, @Body() user: Partial<UserDto>) {
    return this.UpdateUserUseCase.execute(id, user);
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiResponse({ description: 'User removed', status: 204 })
  async remove(@Param('id') id: string) {
    return this.RemoveUserUseCase.execute(id);
  }

  @Get(':id')
  @ApiResponse({type: UserDto, status: 200})
  @ApiNotFoundResponse({ description: 'User not found.' })
  async findOne(@Param('id') id: string) {
    return this.FindOneUserUseCase.execute(id);
  }

  @Get('search/:email')
  @ApiResponse({type: UserDto, status: 200})
  @ApiNotFoundResponse({ description: 'User not found.' })
  async searchByEmail(@Param('email') email: string) {
    return this.SearchByEmailUserUseCase.execute(email);
  }
  
  @Get()
  @ApiResponse({type: UserDto, isArray: true, status: 200})
  async findAll() {
    return this.FindAllUserUseCase.execute();
  }

}
