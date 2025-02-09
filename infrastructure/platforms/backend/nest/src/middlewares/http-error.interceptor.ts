import NotFoundError from "@app/domain/errors/NotFoundError";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
import { ValidationError } from "sequelize";

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception);

    if (exception instanceof ForeignKeyConstraintError) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.name);
    } else if (exception instanceof UniqueConstraintError) {
      response.status(HttpStatus.CONFLICT).json(exception.name);
    } else if (exception instanceof ValidationError) {
      response.status(HttpStatus.BAD_REQUEST).json(exception.message);
    } else if (exception instanceof NotFoundError) {
      response.status(HttpStatus.NOT_FOUND).json(exception.name);
    } else {
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(httpStatus).json(exception.message);
    }
  }
}
