import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Albums } from '../../entities/albums/albums.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Albums])],
  // controllers: [PhotoController],
  // providers: [PhotoService],
})
export class AlbumsModule {}
