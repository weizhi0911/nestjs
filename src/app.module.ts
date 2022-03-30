import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { PhotoModule } from './modules/photo/photo.module';
import { PhotoMetadataModule } from './modules/photoMetadata/photoMetadata.module';

import { User } from './entities/user/user.entity';
import { Photo } from './entities/photo/photo.entity';
import { PhotoMetadata } from './entities/photoMetadata/photoMetadata.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_node',
      synchronize: true,
      entities: [User, Photo, PhotoMetadata],
    }),
    UserModule,
    PhotoModule,
    PhotoMetadataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
