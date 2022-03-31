import { Controller, Get, Post, Query, Body, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';

import { PhotoService } from './photo.service';
import { Photo } from '../../entities/photo/photo.entity'
import { PhotoMetadata } from "../../entities/photoMetadata/photoMetadata.entity";
import { Albums } from "../../entities/albums/albums.entity";
import { Author } from "../../entities/author/author.entity";

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) { }
  @Get()
  root(): string {
    return this.photoService.root();
  }

  @Get('getList')
  getList(): Promise<any> {
    return this.photoService.getList();
  }

  // @Get('save')
  // save(user: Photo) {
  //   return this.photoService.save(user);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('imgFile'))
  async upload(@UploadedFile() file){
    file.url = file.fieldname // 路径到时候要可访问，之后添加
    let photo = new Photo();
    photo.imgFile = file.buffer
    photo.url = 'url'
    photo.name = file.originalname
    photo.filename = file.fieldname


    await this.photoService.save(photo);

    return {
      code: 200,
      file: file
    }
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
    metadata.compressed = true;
    metadata.comment = "cybershoot";
    metadata.orientation = "portait";

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