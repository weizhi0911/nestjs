import { Module } from '@nestjs/common';

import { CosController } from './cos.controller';
import { CosService } from './cos.service';
import { PhotoModule } from '../photo/photo.module';

@Module({
  imports: [PhotoModule],
  controllers: [CosController],
  providers: [CosService],
})
export class CosModule {}
