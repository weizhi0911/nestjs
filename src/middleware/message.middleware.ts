import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable, catchError } from 'rxjs';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // console.log(22222222222222)
        return {
          status: 200,
          message: '请求成功',
          data: data,
        };
      }),
      catchError(error => {
        console.log(error.message)
        if (error instanceof EntityNotFoundError) {
          throw new NotFoundException(error.message);
        } else {
          throw error;
        }
      })
    );
  }
}