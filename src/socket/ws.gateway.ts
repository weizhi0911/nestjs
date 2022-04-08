import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";

import * as WebSocket from 'ws';
import { Server } from "socket.io";
import { from, map, Observable } from "rxjs";
@WebSocketGateway(3008, {
  // transports: ['websocket'],
  // allowEIO3: true,
  cors: {
    origin: '*'
  }
})

export class WsStartGateway {
  //供其它模块调用
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('hello')
  hello(@MessageBody() data: any): any {
    console.log('获取事件', data)
    return {
      "event": "hello",
      "data": data,
      "msg": 'rustfisher.com'
    };

  }
  @SubscribeMessage('hello2')
  hello2(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {

    console.log('收到消息 client:', client);

    client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }));

    return { event: 'hello2', data: data };

  }

  @SubscribeMessage('events')
  onEvent(@MessageBody() data: unknown): Observable<WsResponse<number>> {
    console.log('监听', data)
    const event = 'events';
    const response = [1, 2, 3];

    return from(response).pipe(
      map(data => ({ event, data })),
    );
  }

  // publecMessage(message: string): void {
  //   setInterval(() => {
  //     this.server.emit('hello', `服务器的消息${message}`)
  //   }, 1000)
  // }


}