import { Controller, Get, Post, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common'
// import { HttpService } from '@nestjs/axios';
import { FileInterceptor } from '@nestjs/platform-express';

import { CosService } from './cos.service';
import { Photo } from '../../entities/photo/photo.entity'
import { PhotoService } from '../photo/photo.service';
import { PhotoMetadata } from "../../entities/photoMetadata/photoMetadata.entity";

const sizeOf = require('image-size')

@Controller('cos')
export class CosController {
  constructor(private readonly cosService: CosService, private readonly photoService: PhotoService,) { }
  @Get()
  root(): string {
    return this.cosService.root();
  }

  @Get('getList')
  async getList() {
    // await cos.getObjectUrl({
    //   Bucket: Bucket,
    //   Region: Region,
    //   Key: '微信图片_20220322174254 - 副本.jpg',
    //   Sign: true,
    // },
    //   (err, data) => {
    //     console.log('err', err);
    //     console.log('data', data);
    //     return 'err || data'
    //   }
    // );
    // return this.photoService.getList();
  }

  // @Get('save')
  // save(user: Photo) {
  //   return this.photoService.save(user);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('imgFile'))
  async upload(@UploadedFile() file) {
    const promise = new Promise((resolve, reject) => {
      this.cosService.saveImg(resolve, reject, file);
    })
    let resut
    await Promise.resolve(promise).then((async data => {
      let photo = new Photo();
      photo.description = '腾讯云cos'
      photo.url = data['Location']
      photo.name = file.originalname
      photo.filename = file.fieldname

      const dimensions = sizeOf(file.buffer)
      let metadata = new PhotoMetadata()
      metadata.height = dimensions.width;
      metadata.width = dimensions.height;

      photo.metadata = metadata
      await this.photoService.save(photo);
      resut = { code: data['statusCode'], url: data['Location'] }
    })).catch(() => {
      resut = {
        msg: '失败'
      }
    })

    return resut
  }

}