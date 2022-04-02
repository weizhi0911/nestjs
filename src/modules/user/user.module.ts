import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from '../../middleware/logger.middleware'

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../../entities/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    // 文档描述： https://docs.nestjs.cn/8/middlewares?id=%e4%be%9d%e8%b5%96%e6%b3%a8%e5%85%a5 
    // exclude,forRoutes都支持对象与路径字符的写法
    consumer
      .apply(LoggerMiddleware) // 中间件
      .exclude( // 中间件屏蔽某些路径的请求
        // { path: 'user/getList', method: RequestMethod.GET }, // *屏蔽user/getList的get请求
        // { path: 'user/login', method: RequestMethod.POST }, // *屏蔽user/getList的post请求
        // { path: 'user/(.*)', method: RequestMethod.GET }, // *屏蔽user/开头的get请求
        // 'user/(.*)', // *屏蔽user/开头的所有类型请求
      )
      .forRoutes('user'); // 需要使用中间件的路径与controller
  }
}
