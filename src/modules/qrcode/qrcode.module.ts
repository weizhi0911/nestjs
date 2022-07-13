import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QRCodeController } from './qrcode.controller';
import { QRCodeService } from './qrcode.service';
// import { PhotoMetadata } from '../../entities/photoMetadata/photoMetadata.entity'


@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [QRCodeController],
  providers: [QRCodeService],
  exports: [QRCodeService],
})
export class QrcodeMetadataModule {}
