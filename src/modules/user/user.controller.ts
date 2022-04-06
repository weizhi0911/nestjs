import {
  Controller, Get, Query, Post, HttpCode,
  HttpStatus, UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from '../../dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @UseGuards(JwtAuthGuard)
  @Get()
  root(): string {
    return this.userService.root();
  }
  @UseGuards(JwtAuthGuard)
  @Post('save')
  @HttpCode(HttpStatus.OK)
  async save(@Query() query: UpdateUserDto): Promise<any> {
    const data = await this.userService.save(query)
    return data;
  }
  @UseGuards(JwtAuthGuard)
  @Get('get')
  get(@Query() query): any {
    if (query.id) {
      query.id = Number(query.id);
    }
    if (query.age) {
      query.age = Number(query.age);
    }
    return this.userService.get(query);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getList')
  getList(): any {
    return this.userService.getList();
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
  @UseGuards(JwtAuthGuard)
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
