import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { PhotoModule } from './modules/photo/photo.module';
import { PhotoMetadataModule } from './modules/photoMetadata/photoMetadata.module';
import { AuthorModule } from './modules/author/author.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // 更多连接选项见 https://typeorm.biunav.com/zh/connection-options.html#%E5%B8%B8%E7%94%A8%E7%9A%84%E8%BF%9E%E6%8E%A5%E9%80%89%E9%A1%B9
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_node',
      synchronize: true,
      // entities: [User, Photo, PhotoMetadata, Author, Albums],
      entities: [__dirname + "/**/*.entity{.ts,.js} "], // 以文件扫描实体
    }),
    UserModule,
    PhotoModule,
    PhotoMetadataModule,
    AuthorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
