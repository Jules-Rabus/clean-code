import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

import CreateUserUseCase from "@app/application/useCases/users/CreateUserUseCase";
import RemoveUserUseCase from "@app/application/useCases/users/RemoveUserUseCase";
import UpdateUserUseCase from "@app/application/useCases/users/UpdateUserUseCase";
import FindOneUserUseCase from "@app/application/useCases/users/FindOneUserUseCase";
import FindAllUserUseCase from "@app/application/useCases/users/FindAllUserUseCase";
import SearchByEmailUserUseCase from "@app/application/useCases/users/SearchByEmailUseCase";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiProperty,
  ApiResponse,
} from "@nestjs/swagger";
import { UserDto, UpdateUserDto } from "./UserDto";
import { Public } from "@app/nest/src/auth/decorators/public.decorator";

@Controller("users")
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
  @ApiProperty({ type: UserDto })
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
  })
  async create(@Body() user: UserDto, @Res() response: Response) {
    const createdUser = await this.CreateUserUseCase.execute(user);
    return response.status(HttpStatus.CREATED).json(createdUser);
  }

  @Patch(":id")
  @ApiNotFoundResponse({ description: "User not found." })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ type: UserDto, status: HttpStatus.OK })
  async update(@Param("id") id: string, @Body() user: UpdateUserDto) {
    return await this.UpdateUserUseCase.execute(id, user);
  }

  @Delete(":id")
  @ApiNotFoundResponse({ description: "User not found." })
  @ApiResponse({ description: "User removed", status: HttpStatus.NO_CONTENT })
  async remove(@Param("id") id: string, @Res() response: Response) {
    await this.RemoveUserUseCase.execute(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }

  @Get(":id")
  @ApiResponse({ type: UserDto, status: HttpStatus.OK })
  @ApiNotFoundResponse({ description: "User not found." })
  async findOne(@Param("id") id: string) {
    return await this.FindOneUserUseCase.execute(id);
  }

  @Get("search/:email")
  @ApiResponse({ type: UserDto, status: HttpStatus.OK })
  @ApiNotFoundResponse({ description: "User not found." })
  async searchByEmail(@Param("email") email: string) {
    return await this.SearchByEmailUserUseCase.execute(email);
  }

  @Get()
  @ApiResponse({ type: UserDto, isArray: true, status: HttpStatus.OK })
  async findAll() {
    return this.FindAllUserUseCase.execute();
  }
}
