import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService, private readonly jwtService: JwtService,) { }
  async login(user) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByName(username, pass);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}
