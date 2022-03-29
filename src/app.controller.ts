import {
  Controller,
  Get,
  Post,
  Redirect,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

// { host: 'admin.example.com' } 暂时不懂
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    // ?version=5
    console.log(version);
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
