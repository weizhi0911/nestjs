import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// import { isArray } from 'class-validator';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // 状态码信息
    let status
    // 错误信息
    let errorMsg
    let validatorMessage // 自定义错误msg
    // 派生类型传来的信息
    // if (exception instanceof HttpException) {
      const exceptionResponse: any = exception.getResponse()
      validatorMessage = exceptionResponse
      if (typeof validatorMessage === 'object') {
        validatorMessage = Array.isArray(exceptionResponse.message) ? exceptionResponse.message[0] : exceptionResponse.message
        errorMsg = exceptionResponse.error
        status = exceptionResponse.statusCode
      }
    // }


    response.status(status).json({
      statusCode: status,
      message: validatorMessage,
      timestamp: new Date().toISOString(),
      error: errorMsg
    });
  }
}