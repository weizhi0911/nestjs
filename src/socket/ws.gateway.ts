import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";

import * as WebSocket from 'ws';
import { Server, Socket } from 'socket.io';

import { from, map, Observable } from "rxjs";
// @WebSocketGateway(3008)
@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})

export class WsStartGateway {
  //供其它模块调用
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createD')
  create(@MessageBody() createDDto) {
    console.log('发送websocket')
    return "ok";
  }

  @SubscribeMessage('hello')
  hello(@MessageBody() data: any): any {
    // console.log()
    this.server.emit("createD", { data: "穷哈哈哈" })
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
  onEvent(client: Socket) {
    client.emit('tips', {
      code: -1,
      msg: '非法操作，不可移除他人消息！',
    });
  }

  // publecMessage(message: string): void {
  //   setInterval(() => {
  //     this.server.emit('hello', `服务器的消息${message}`)
  //   }, 1000)
  // }


}