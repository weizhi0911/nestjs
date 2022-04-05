import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { Photo } from '../../entities/photo/photo.entity';

import { PhotoMetadataModule } from '../photoMetadata/photoMetadata.module';
// import { CosModule } from '../cos/cos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), PhotoMetadataModule, HttpModule],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
