import {
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
  IsEmail,
  IsMobilePhone,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  @MaxLength(20, {
    message: '密码长度不能超过20位',
  })
  password: string;

  @IsOptional()
  @IsEmail({}, { message: '邮箱格式错误' })
  email: string;

  @IsOptional()
  @IsMobilePhone('zh-CN', {}, { message: '手机号码格式错误' })
  mobile: string;

  @IsOptional()
  @IsEnum(['male', 'female'], {
    message: 'gender只能传入字符串male或female',
  })
  gender: string;

  @IsOptional()
  @IsEnum({ 禁用: 0, 可用: 1 },{
    message: 'status只能传入数字0或1',
  })
  @Type(() => Number) //如果传递的是string类型，不报错，自动转成number类型
  status: number;
}
