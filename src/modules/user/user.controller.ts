import {
  Controller,
  Get,
  Query,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';

import { ApiTags, ApiParam, ApiQuery, ApiHeader } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UpdateUserDto } from '../../dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WsStartGateway } from 'src/socket/ws.gateway';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly ws: WsStartGateway,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  root(): string {
    return this.userService.root();
  }
  // @UseGuards(JwtAuthGuard)
  @Post('save')
  @HttpCode(HttpStatus.OK)
  async save(@Query() query: UpdateUserDto): Promise<any> {
    const data = await this.userService.save(query);

    return data;
  }

  // @UseGuards(JwtAuthGuard)
  @Get('get')
  @ApiParam({
    name: 'id',
    description: '这是用户id',
  })
  @ApiQuery({
    name: 'id',
    required: false,
    description: '这是需要传递的参数',
  })
  @ApiHeader({
    name: 'authoriation',
    required: false,
    description: '本次请求请带上token',
  })
  get(@Query() query): any {
    if (query.id) {
      console.log('999');
      query.id = Number(query.id);
    }
    if (query.age) {
      query.age = Number(query.age);
    }
    return this.userService.get(query);
  }
  // @UseGuards(JwtAuthGuard)
  @Get('getList')
  getList(): any {
    this.ws.server.emit('events', { data: '穷哈哈哈' });
    // this.ws.hello('hello')
    return this.userService.getList();
  }
  @Get('cookie')
  getCookie(@Request() req) {
    console.log(req.cookies);
    return req.cookies.username;
  }

  @UseGuards(JwtAuthGuard)
  @Get('getOne')
  getOne(@Query() query): any {
    if (query.id) {
      query.id = Number(query.id);
    }
    console.log('option getOne: ', query);

    return this.userService.getOne(query);
  }
  // @UseGuards(JwtAuthGuard)
  @Get('remove')
  remove(@Query() query): any {
    if (query.id) {
      query.id = Number(query.id);
    }
    if (query.age) {
      query.age = Number(query.age);
    }
    return this.userService.remove(query);
  }
}
