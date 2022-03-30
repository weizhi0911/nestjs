import { Injectable } from '@nestjs/common';
import { PhotoMetadata } from '../../entities/photoMetadata/photoMetadata.entity'

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoMetadataService {
  constructor(
    @InjectRepository(PhotoMetadata)
    private readonly metadataRepository: Repository<PhotoMetadata>,
  ) { }

  root(): string {
    return 'PhotoMetadataService';
  }

  async save(option: PhotoMetadata): Promise<any> {
    const res = await this.metadataRepository.save(option);
    console.log('save: ', res);
    return res;
  }

  // async getList() {
  //   const res = await this.metadataRepository.find()
  //   return res;
  // }
}
