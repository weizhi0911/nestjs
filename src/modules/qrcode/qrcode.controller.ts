import { Controller, Get, Query, Res} from '@nestjs/common';
import { image } from 'qr-image';
import { QRCodeService } from './qrcode.service';

@Controller('qrCode')
export class QRCodeController {
  constructor(
    private readonly service: QRCodeService){}

  @Get('') // 生成二维码
  getQrCode(@Query() {text},@Res() res) {
      return image(text,{type:'png',margin:2}).pipe(res)
  }
}
