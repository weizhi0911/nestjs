import { Injectable } from '@nestjs/common';
import { Photo } from '../../entities/photo/photo.entity'

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) { }

  root(): string {
    return 'photoService';
  }

  async save(user: Photo): Promise<any> {
    const res = await this.photoRepository.save(user);
    console.log('save: ', res);
    return res;
  }

  async getList() {
    const res = await this.photoRepository.find()
    return res;
  }
}
