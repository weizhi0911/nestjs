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
    return res;
  }


  async getList(): Promise<any> {
    const res = await this.photoRepository.find();
    return res;
  }

  async getImgUrl(id: number): Promise<any> {
    const res = await this.photoRepository.findOne({
      where: {
        id
      }
    });
    return res;
  }

  async takeOut() {
    // * metadata为entity里的一对一关系，代表着查photo_metadata表的对应数据
    const res = await this.photoRepository.find({ relations: ["metadata"] })
    return res;
  }

  async takeOutMetadata() {
    const res = await this.photoRepository.createQueryBuilder("photo").innerJoinAndSelect("photo.metadata", "metadata").getMany()
    console.log(res)
    return res;
  }

  async takeOutAuthor(option: Object) {
    const res = await this.photoRepository.findOne({ where: [option], relations: ["author"] });
    console.log(res)
    return res;
  }

  async takeOutAlbums(option: Object) {
    const res = await this.photoRepository.findOne({ where: [option], relations: ["albums"] });
    console.log(res)
    return res;
  }
}
