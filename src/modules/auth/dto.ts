import {
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
  IsEmail, IsNotEmpty,
  IsMobilePhone,
} from 'class-validator';
import { Type } from 'class-transformer';

export class LoginDto {
  @MaxLength(20, {
    message: '用户名长度不能大于20位',
  })
  @IsNotEmpty({ message: '用户名不可以为空' })
  username: string;

  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  @MaxLength(20, {
    message: '密码长度不能超过20位',
  })
  @IsNotEmpty({ message: '密码不可以为空' })
  password: string;

  @Type(() => Number) //如果传递的是string类型，不报错，自动转成number类型
  status: number;
}
