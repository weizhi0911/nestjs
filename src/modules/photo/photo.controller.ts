import { Controller, Get, Post, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common'
import { HttpService } from '@nestjs/axios';
import { FileInterceptor } from '@nestjs/platform-express';

import { PhotoService } from './photo.service';
import { Photo } from '../../entities/photo/photo.entity'
import { PhotoMetadata } from "../../entities/photoMetadata/photoMetadata.entity";
import { Albums } from "../../entities/albums/albums.entity";
import { Author } from "../../entities/author/author.entity";
const sizeOf = require('image-size')

// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
const COS = require('cos-nodejs-sdk-v5');
const Bucket = 'wwf-1306809097';
// 存储桶Region可以在COS控制台指定存储桶的概览页查看 https://console.cloud.tencent.com/cos5/bucket/ 
// 关于地域的详情见 https://cloud.tencent.com/document/product/436/6224
const Region = 'ap-nanjing';

const cos = new COS({
  // Bucket: Bucket,
  // Region: Region,
  SecretId: 'AKIDBBwUnqc8ON5VfYBXbQyFFzSQ8ZibDYcQ',
  SecretKey: 'YppY0B6j9IAl58uQgeLmwpSnreAPO6Xh'
});
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService, private readonly httpService: HttpService) { }
  @Get()
  root(): string {
    return this.photoService.root();
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
    return this.photoService.getList();
  }

  // @Get('save')
  // save(user: Photo) {
  //   return this.photoService.save(user);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('imgFile'))
  async upload(@UploadedFile() file) {
    // const filePath = "temp-file-to-upload" // 本地文件路径
    console.log(file)
    cos.putObject({
      Bucket: Bucket, /* 填入您自己的存储桶，必须字段 */
      Region: Region,  /* 存储桶所在地域，例如ap-beijing，必须字段 */
      Key: file.originalname,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      Body: Buffer.from(file.buffer), /* 必须 */
    }, async (err, data) => {
      console.log(err || data);
      if (data) {
        let photo = new Photo();
        photo.description = '腾讯云cos'
        photo.url = data.Location
        photo.name = file.originalname
        photo.filename = file.fieldname

        const dimensions = sizeOf(file.buffer)
        let metadata = new PhotoMetadata()
        metadata.height = dimensions.width;
        metadata.width = dimensions.height;

        photo.metadata = metadata
        await this.photoService.save(photo);
        return {
          code: 200,
          file: 'file'
        }
      }
    });

    // file.url = file.fieldname // 路径到时候要可访问，之后添加

    // let photo = new Photo();
    // photo.imgFile = file.buffer
    // photo.url = 'url'
    // photo.name = file.originalname
    // photo.filename = file.fieldname

    // const dimensions = sizeOf(file.buffer)
    // let metadata = new PhotoMetadata()
    // metadata.height = dimensions.width;
    // metadata.width = dimensions.height;

    // photo.metadata = metadata


    // await this.photoService.save(photo);

    // return {
    //   code: 200,
    //   file: file
    // }
  }

  @Get('image/:id')
  getImgUrl(@Param() param) {
    return this.photoService.getImgUrl(Number(param.id));
  }

  @Get('establish')
  async establish() {
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";

    let metadata = new PhotoMetadata()
    metadata.height = 640;
    metadata.width = 480;

    photo.metadata = metadata;

    await this.photoService.save(photo)
    return 'OK'
  }



  @Get('takeOut')
  async takeOut() {
    return this.photoService.takeOut()
  }

  @Get('takeOutMetadata')
  async takeOutMetadata() {
    return this.photoService.takeOutMetadata()
  }

  // id查询
  @Get('takeOutAuthor')
  async takeOutAuthor(@Query() query): Promise<any> {
    let photo = new Photo();

    if (query.id) {
      photo.id = Number(query.id)
    }
    //  if (query.authorId) {
    //   photo.authorId = Number(query.authorId)
    //   console.log(query.authorId)
    // }
    return this.photoService.takeOutAuthor(photo)
  }


  @Get('establishAuthor')
  async establishAuthor() {
    let photo = new Photo();
    photo.name = "author and Bears";
    photo.description = "author am near polar bears";
    photo.filename = "author-with-bears.jpg";

    let author = new Author();
    author.name = "Bears";
    photo.author = author;

    await this.photoService.save(photo)
    // await this.photoMetadataService.save(metadata)
    return 'OK'
  }


  @Get('establishAlbums')
  async establishAlbums() {
    let photo = new Photo();
    photo.name = "11111Me and Bears";
    photo.description = "1111I am near polar bears";
    photo.filename = "1photo-with-bears.jpg";

    let album1 = new Albums();
    album1.name = "Bears";
    // await connection.manager.save(album1);
    let album2 = new Albums();
    album2.name = "Me";

    // metadata.photo = photo; // 联接两者
    photo.albums = [album1, album2];

    await this.photoService.save(photo)
    // await this.photoMetadataService.save(metadata)
    return 'OK'
  }
  // id查询
  @Get('takeOutAlbums')
  async takeOutAlbums(@Query() query): Promise<any> {
    let photo = new Photo();

    if (query.id) {
      photo.id = Number(query.id)
    }
    return this.photoService.takeOutAlbums(photo)
  }

}