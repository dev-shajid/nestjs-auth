import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from './ApiResponse';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException ? exception.message : 'Internal server error';

    const res:string | object = exception instanceof HttpException ? exception.getResponse() : null;
    
    let errors = null;
    if (res && typeof res === 'object' && typeof res['message'] == 'object') {
      errors = res['message'] ? res['message'] : null;
    }
    
    response.status(status).json(
      ApiResponse(status, message, null, errors)
    );
  }
}
