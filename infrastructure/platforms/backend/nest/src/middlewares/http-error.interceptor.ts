
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
  
@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  
    catch(exception: any, host: ArgumentsHost): void {
        console.debug(exception);


        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        console.log("exception.name: ", exception.name);

        if (exception.name === 'ValidationError') {
            response.sendStatus(HttpStatus.BAD_REQUEST);
        }

        response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}