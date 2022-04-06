import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 提供从请求中提取 JWT 的方法。我们将使用在 API 请求的授权头中提供 token 的标准方法
      ignoreExpiration: false, // 选择默认设置 false ，它将确保 JWT 没有过期的责任委托给 Passport 模块。这意味着，如果我们的路由提供了一个过期的 JWT ，请求将被拒绝，并发送 401 未经授权的响应
      secretOrKey: jwtConstants.secret, // 密钥
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}