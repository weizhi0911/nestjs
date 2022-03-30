import { Controller, Get } from '@nestjs/common'
import { PhotoService } from './photo.service';
import { PhotoMetadataService } from '../photoMetadata/photoMetadata.service';
import { Photo } from '../../entities/photo/photo.entity'
import { PhotoMetadata } from "../../entities/photoMetadata/photoMetadata.entity";

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService, private readonly photoMetadataService: PhotoMetadataService) { }
  @Get()
  root(): string {
    return this.photoService.root();
  }

  @Get('getList')
  getList(): Promise<any> {
    return this.photoService.getList();
  }

  @Get('establish')
  async establish() {
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";
    photo.isPublished = true;

    let metadata = new PhotoMetadata()
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = "cybershoot";
    metadata.orientation = "portait";
    metadata.photo = photo; // 联接两者

    await this.photoService.save(photo)
    await this.photoMetadataService.save(metadata)

    console.log("Metadata is saved, and relation between metadata and photo is created in the database too");
  }

}