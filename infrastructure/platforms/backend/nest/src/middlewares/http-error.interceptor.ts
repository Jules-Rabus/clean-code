
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ForeignKeyConstraintError, UniqueConstraintError } from 'sequelize';
import { ValidationError } from 'sequelize';
  
@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
        
    catch(exception: any, host: ArgumentsHost): void {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof ForeignKeyConstraintError) {
           response.status(HttpStatus.BAD_REQUEST).json(exception.name);
        }

        if (exception instanceof UniqueConstraintError) {
            response.status(HttpStatus.CONFLICT).json(exception.name);
        }

        if(exception instanceof ValidationError) {
            response.status(HttpStatus.BAD_REQUEST).json(exception.name);
        }
        
        const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(httpStatus).json(exception.message);
    }
}