import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { AllExceptionsFilter } from './filter/any-exception.filter';
// import { AuthInterceptor } from './middleware/message.middleware';
import * as cookieParser from 'cookie-parser';
import { WsAdapter } from './socket/ws.adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.REDIS,
  //   options: {
  //     url: 'redis://localhost:6379',
  //   },
  // });

  app.useGlobalFilters(new AllExceptionsFilter()); //* 全局捕获异常
  app.useGlobalPipes(new ValidationPipe()); //* 注册校验工具
  // app.use(new AuthInterceptor); // *全局中间件
  // app.useGlobalInterceptors(new AuthInterceptor()) // *全局注册拦截器
  // app.useGlobalGuards(**) //*全局守卫
  app.use(cookieParser('dmyxs')); //*cookie全局中间件  //加密密码
  app.enableCors(); //* 解决跨域

  app.useWebSocketAdapter(new WsAdapter(app)); // 使用我们的适配器

  const options = new DocumentBuilder()
    .setTitle('nest入门接口标题')
    .setDescription('使用nest书写的常用性接口') // 文档介绍
    .setVersion('1.0.0') // 文档版本
    .addTag('用户,安全') // 每个tag标签都可以对应着几个@ApiUseTags('用户,安全') 然后被ApiUseTags注释，字符串一致的都会变成同一个标签下的
    // .setBasePath('http://localhost:5000')
    .build();
  // 为了创建完整的文档（具有定义的HTTP路由），我们使用类的createDocument()方法SwaggerModule。此方法带有两个参数，分别是应用程序实例和基本Swagger选项。
  const document = SwaggerModule.createDocument(app, options);
  // 最后一步是setup()。它依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
  SwaggerModule.setup('/api', app, document);

  await app.listen(3000);
}
bootstrap();
