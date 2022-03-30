import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoMetadataController } from './photoMetadata.controller';
import { PhotoMetadataService } from './photoMetadata.service';
import { PhotoMetadata } from '../../entities/photoMetadata/photoMetadata.entity'


@Module({
  imports: [TypeOrmModule.forFeature([PhotoMetadata])],
  controllers: [PhotoMetadataController],
  providers: [PhotoMetadataService],
  exports: [PhotoMetadataService],
})
export class PhotoMetadataModule {}
