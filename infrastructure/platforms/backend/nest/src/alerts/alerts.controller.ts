import { Controller, Get, HttpStatus, Param } from "@nestjs/common";

import FindOneAlertUseCase from "@app/application/useCases/alerts/FindOneAlertUseCase";
import FindAllAlertUseCase from "@app/application/useCases/alerts/FindAllAlertUseCase";

import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
} from "@nestjs/swagger";
import { AlertDto } from "@app/application/dto/AlertDto";

@Controller("alerts")
@ApiBearerAuth()
export class AlertsController {
  constructor(
    private readonly FindOneAlertUseCase: FindOneAlertUseCase,
    private readonly FindAllAlertUseCase: FindAllAlertUseCase,
  ) {}

  @Get()
  @ApiResponse({ type: AlertDto, status: HttpStatus.OK })
  async findAll() {
    return await this.FindAllAlertUseCase.execute();
  }

  @Get(":id")
  @ApiNotFoundResponse({ description: "Alert not found." })
  @ApiResponse({ type: AlertDto, status: HttpStatus.OK })
  async findOne(@Param("id") identifier: string) {
    return await this.FindOneAlertUseCase.execute(identifier);
  }
}
