import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }
  @Post('/login')
  @UseGuards(LocalAuthGuard) // 登录中间件
  async login(@Body() _: LoginDto, @Request() req) {
    console.log(req) // 接收服务返回的数据
    // throw new BadRequestException('Invalid password');
    return this.authService.login(req.user);
  }
}
