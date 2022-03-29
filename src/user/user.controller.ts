import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user/User.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userSrvice: UserService) {}

  @Get()
  root(): string {
    return this.userSrvice.root();
  }

  @Get('save')
  save(@Query() query): any {
    console.log(query);
    const user = new User();
    user.name = query.name;
    user.gender = query.gender;
    user.age = Number(query.age);
    if (query.id) {
      user.id = Number(query.id);
    }

    return this.userSrvice.save(user);
  }

  @Get('get')
  get(@Query() query): any {
    if (query.id) {
      query.id = Number(query.id);
    }
    if (query.age) {
      query.age = Number(query.age);
    }
    return this.userSrvice.get(query);
  }

  @Get('remove')
  remove(@Query() query): any {
    if (query.id) {
      query.id = Number(query.id);
    }
    if (query.age) {
      query.age = Number(query.age);
    }
    return this.userSrvice.remove(query);
  }
}
