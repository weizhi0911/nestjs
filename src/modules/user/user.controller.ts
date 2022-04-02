import { Controller, Get, Query, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  root(): string {
    return this.userService.root();
  }


  @Post('login')
  async login(@Query() query): Promise<any> {
    const data = await this.userService.login(query)
    return data;
  }

  @Post('save')
  async save(@Query() query): Promise<any> {
    const user = new User();
    user.name = query.name;
    user.password = query.password;
    if (query.id) {
      user.id = Number(query.id);
    }

    const data = await this.userService.save(user)
    return data;
  }

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

  @Get('getList')
  getList(): any {
    return this.userService.getList();
  }

  @Get('getOne')
  getOne(@Query() query): any {
    if (query.id) {
      query.id = Number(query.id);
    }
    console.log('option getOne: ', query);

    return this.userService.getOne(query);
  }

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
