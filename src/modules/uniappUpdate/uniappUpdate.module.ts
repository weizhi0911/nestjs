import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniappUpdate } from 'src/entities/uniappUpdate/uniappUpdate.entity';

import { UniappController } from './uniappUpdate.controller';
import { UniappUpdateService } from './uniappUpdate.service';

@Module({
  imports: [ TypeOrmModule.forFeature([UniappUpdate])],
  controllers: [UniappController],
  providers: [UniappUpdateService],
})
export class UniappModule { }
