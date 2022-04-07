import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { PhotoModule } from './modules/photo/photo.module';
import { PhotoMetadataModule } from './modules/photoMetadata/photoMetadata.module';
import { AuthorModule } from './modules/author/author.module';
import { CosModule } from './modules/cos/cos.module';
import { CatsModule } from './modules/cats/cats.module';
// import { AuthController } from './modules/auth/auth.controller';
// import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';

import { User } from './entities/user/user.entity';
import { Photo } from './entities/photo/photo.entity';
import { PhotoMetadata } from './entities/photoMetadata/photoMetadata.entity';
import { Author } from './entities/author/author.entity';
import { Albums } from './entities/albums/albums.entity';
import { WsStartGateway } from './ws/ws.gateway';

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
      entities: [User, Photo, PhotoMetadata, Author, Albums],
      // entities: [__dirname + "/**/*.entity{.ts,.js} "], // 以文件扫描实体
    }),
    UserModule,
    PhotoModule,
    PhotoMetadataModule,
    AuthorModule,
    CosModule,
    CatsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, WsStartGateway],
})
export class AppModule {

}
