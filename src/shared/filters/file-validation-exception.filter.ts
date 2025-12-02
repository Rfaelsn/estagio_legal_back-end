import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class FileValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;
    const exceptionResponse = exception.getResponse();

    let message =
      'Não foi possível processar o(s) arquivo(s) enviado(s). Por favor, verifique se o arquivo está íntegro, no formato correto (PDF) e tente novamente.';
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      if (
        'message' in exceptionResponse &&
        Array.isArray((exceptionResponse as any).message)
      ) {
        const msgArr = (exceptionResponse as any).message;
        if (
          msgArr.some((msg: string) => msg.includes('File type is not valid'))
        ) {
          message = 'Arquivo PDF inválido ou corrompido.';
        } else if (
          msgArr.some((msg: string) => msg.includes('File too large'))
        ) {
          message = 'O arquivo enviado excede o tamanho máximo permitido.';
        }
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
