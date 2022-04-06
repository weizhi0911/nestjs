import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { AllExceptionsFilter } from './filter/any-exception.filter';
import { AuthInterceptor } from './middleware/message.middleware';

// const logger = (req, res, next) => {
//   console.log(`Reque22st...`);
//   next();
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter()); //* 全局捕获异常
  app.useGlobalPipes(new ValidationPipe()); //* 注册校验工具
  // app.use(new AuthInterceptor); // *全局中间件
  // app.useGlobalInterceptors(new AuthInterceptor()) // *全局注册拦截器
  // app.useGlobalGuards(**) //*全局守卫
  await app.listen(3000);
}
bootstrap();
