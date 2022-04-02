import {
  Controller,
  Get,
  Post,
  Redirect,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
// @Controller({ host: ':account.example.com' }) // *host子域路由，具体概念见https://blog.csdn.net/netdxy/article/details/51195560
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302) // 请求重定向
  getDocs(@Query('version') version) {
    // ?version=5
    console.log(version);
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // @Post()
  // create(@Res() res: Response) {
  //   res.status(HttpStatus.CREATED).send();
  // }

  // @Post()
  // create(@Res() res: Response) {
  //   res.status(HttpStatus.CREATED).send(['22222']);
  // }

  // @Get()
  // findAll(@Res() res: Response) {
  //   res.status(HttpStatus.OK).json([22]);
  // }

  @Get()
  // @HttpCode(204) // *改变http返回状态码
  getHello() {
    return this.appService.getHello();
  }
}
