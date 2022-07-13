import { Controller, Get, Post, Body, UseGuards, Request, Response, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }
  @Post('/login')
  // @HttpCode(HttpStatus.OK) //创建成功返回的是201状态码，这里重置为200
  @UseGuards(LocalAuthGuard) // 登录中间件
  async login(@Body() _: LoginDto, @Request() req, @Response() res) {
    const data = await this.authService.login(req.user);
    console.log(data.access_token) // 接收服务返回的数据
    res.cookie('username', 'aabbcc我是cookie', { maxAge: 1000 * 60 * 10, httpOnly: true })
    res.cookie('pawwwww', 'aabbcc我是cookie', { maxAge: 1000 * 60 * 10, httpOnly: true })

    res.status(HttpStatus.OK).json({ code: 200, data: data.access_token, msg: '登录成功' });
  }


  @Get('/cookie')
  async cookie(@Response() res) {
    res.cookie('username', 'aabbcc我是cookie', { maxAge: 1000 * 60 * 10, httpOnly: true })
    res.cookie('pawwwww', 'aabbcc我是cookie', { maxAge: 1000 * 60 * 10, httpOnly: true })
    res.status(HttpStatus.OK).json({ code: 200, data: this.authService.getHello()});

    // return this.authService.getHello()
  }
}
