import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // console.log(exception)
    // const request = ctx.getRequest();
    // 状态码信息
    let status
    // 错误信息
    let errorMsg 
    let validatorMessage // 自定义错误msg
    if (exception instanceof HttpException) { // 派生类型传来的信息
      // status = exception.getStatus()
      // console.log(exception.getStatus())
      const exceptionResponse: any = exception.getResponse()
      validatorMessage = exceptionResponse
      if (typeof validatorMessage === 'object') {
        validatorMessage = exceptionResponse.message[0]
        errorMsg = exceptionResponse.error
        status = exceptionResponse.statusCode
      }
    } else { // 默认信息
      status = HttpStatus.INTERNAL_SERVER_ERROR
    }

    response.status(status).json({
      statusCode: status,
      message: validatorMessage,
      timestamp: new Date().toISOString(),
      error:errorMsg
    });
  }
}