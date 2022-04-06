import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../../dto/user.dto';

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
  async save(user: UpdateUserDto): Promise<any> {
    const res = await this.userRepository.save(user);
    return res;
  }

  async getList(): Promise<any> {
    const res = await this.userRepository.find();
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

  async findOneByName(username: string, password: string): Promise<User> {
    const data = await this.userRepository.findOne({
      where: { username, password }
    });

    return data
  }
}
