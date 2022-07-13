import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UniappUpdate } from 'src/entities/uniappUpdate/uniappUpdate.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UniappUpdateService {
  constructor(
    @InjectRepository(UniappUpdate)
    private readonly uniappRepository: Repository<UniappUpdate>, // private readonly configService: ConfigService
  ) {}

  root(): string {
    return 'UniappUpdateService';
  }

  async version(version: string): Promise<any> {
    const res = await this.uniappRepository.findOne({
      where: {
        version,
      },
    });
    return res;
  }

  async getZipFile(): Promise<any> {
    // const uploadDir = this.configService.get('file').root;
    // const tarStream = new zip.Stream();  // 文件压缩流
    // await tarStream.addEntry(uploadDir); // 压缩文件路径
    // return { filename: 'hello-world.zip', tarStream }
  }

  async getWgtFile(): Promise<any> {
    // const uploadDir = this.configService.get('file').root;
    // console.log(this.configService.get('file'))
    // const tarStream = new zip.Stream();  // 文件压缩流
    // await tarStream.addEntry(uploadDir); // 压缩文件路径
    // return { filename: 'wwf-app.wgt', tarStream }
  }
}
