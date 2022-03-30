import {Controller, Get } from '@nestjs/common'
import { PhotoMetadataService } from './photoMetadata.service';
// import { PhotoMetadata } from "../../entity/photoMetadata/photoMetadata.entity";

@Controller('metadata')
export class PhotoMetadataController{
  constructor(private readonly PhotoMetadataService:PhotoMetadataService){}
  @Get()
  root(): string {
    return this.PhotoMetadataService.root();
  }
  
}