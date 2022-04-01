import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  root(): string {
    return 'userService';
  }

  // 当user带有id时，save = update；当user没有id时，save = add
  async save(user: User): Promise<any> {
    const option = await this.userRepository.findOne({
      where: {
        name: user.name
      }
    });
    console.log(option)
    const res = await this.userRepository.save(option || user);
    return res;
  }

  async login(user: User): Promise<any> {
    const option = await this.userRepository.findOne({
      where: user
    });

    if (option) {
      return {
        code: 200,
        msg: '登录成功'
      }
    }else{
      return {
        code: 500,
        msg: '该用户未注册'
      }
    }
  }

  async getAll(): Promise<any> {
    const res = await this.userRepository.find();
    console.log('all user: ', res);

    return res;
  }

  async get(option: object): Promise<any> {
    const res = await this.userRepository.find(option);
    // let res = await this.userRepository.find({name: 'longmao'})
    console.log('option user: ', res);

    return res;
  }

  async getOne(option: object): Promise<any> {
    const res = await this.userRepository.findOne({
      where: [option],

    });
    // let res = await this.userRepository.find({name: 'longmao'})
    console.log('option getOne: ', res);
    return res;
  }

  async remove(option: object): Promise<any> {
    const user = await this.userRepository.find(option);

    const res = await this.userRepository.remove(user);

    console.log('remove: ', res);

    return res;
  }
}
