import { Module } from '@nestjs/common';
import { WsStartGateway } from './ws.gateway';

@Module({
  exports: [WsStartGateway],
  providers: [WsStartGateway]
})
export class WsStartModule {}