import { Injectable } from '@nestjs/common';

// 开发者api文档https://cloud.tencent.com/document/product/436/36121
// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
const COS = require('cos-nodejs-sdk-v5');
const Bucket = 'wwf-1306809097';
// 存储桶Region可以在COS控制台指定存储桶的概览页查看 https://console.cloud.tencent.com/cos5/bucket/ 
// 关于地域的详情见 https://cloud.tencent.com/document/product/436/6224
const Region = 'ap-nanjing';

const cos = new COS({
  SecretId: 'AKIDBBwUnqc8ON5VfYBXbQyFFzSQ8ZibDYcQ',
  SecretKey: 'YppY0B6j9IAl58uQgeLmwpSnreAPO6Xh'
});

@Injectable()
export class CosService {
  constructor(
  ) { }

  root(): string {
    return 'cosService';
  }

  async saveImg(resolve: (value: unknown) => void, reject: (value: unknown) => void, file: any): Promise<any> {
    cos.putObject({
      Bucket: Bucket, /* 填入您自己的存储桶，必须字段 */
      Region: Region,  /* 存储桶所在地域，例如ap-beijing，必须字段 */
      Key: file.originalname,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      Body: Buffer.from(file.buffer), /* 必须 */
    }, async (err, data) => {
      console.log(err || data);
      if (data) {
        resolve(data)
      } else {
        reject('失败')
      }
    });
  }

  // async getList(): Promise<any> {
  //   const res = await this.photoRepository.find();
  //   return res;
  // }
}
