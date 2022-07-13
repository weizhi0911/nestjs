import { Controller, Get, Query, Res, Post } from '@nestjs/common';
import { UniappUpdateService } from './uniappUpdate.service';
import { Response } from 'express';

@Controller('uniapp')
export class UniappController {
  constructor(private readonly uniappRepository: UniappUpdateService) {}
  @Get()
  root(): string {
    return this.uniappRepository.root();
  }

  @Get('version')
  async version(@Query() query): Promise<any> {
    return this.uniappRepository.version(query.version);
  }

  @Get('getWgtFile') // 基于流的方式下载
  async getWgtFile(@Res() res: Response): Promise<any> {
    const { filename, tarStream } = await this.uniappRepository.getWgtFile();

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    tarStream.pipe(res); // 流转换到res响应
    // return this.uniappRepository.getWgtFile(
    // )
  }

  @Get('wwf.wgt')
  public view(@Res() res: Response) {
    const filePath =
      'D:\\Study\\Nest\\src\\modules\\uniappUpdate\\__UNI__74BFD07.wgt';
    res.sendFile(filePath, (err) => {
      if (!err) {
        console.log('success', 'wgt', filePath);
        return;
      }
      res.send({ err: -1, msg: String(err) });
    });
  }

  @Get('wwf2.wgt')
  public wwf2(@Res() res: Response) {
    const filePath =
      'D:\\Study\\Nest\\src\\modules\\uniappUpdate\\__UNI__74BFD072.wgt';
    res.sendFile(filePath, (err) => {
      if (!err) {
        console.log('success', 'wgt', filePath);
        return;
      }
      res.send({ err: -1, msg: String(err) });
    });
  }
}
