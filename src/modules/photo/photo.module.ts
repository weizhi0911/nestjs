import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { Photo } from '../../entities/photo/photo.entity';

import { PhotoMetadataModule } from '../photoMetadata/photoMetadata.module';
// import { PhotoMetadataService } from '../photoMetadata/photoMetadata.service';



@Module({
  imports: [TypeOrmModule.forFeature([Photo]), PhotoMetadataModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
