import * as WebSocket from 'ws';
import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
export class WsAdapter implements WebSocketAdapter {
  constructor(private readonly app: INestApplicationContext) {}
  create(port: number, options: any = {}): any {
    return new WebSocket.Server({ port, ...options });
  }
  bindClientConnect(server, callback: Function) { // 绑定客户端连接事件
    console.log('callback')

    server.on('connection', callback);
  }
  bindMessageHandlers( // 将传入的消息绑定到适当的消息处理程序
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ) {

    fromEvent(client, 'message')
      .pipe(
        mergeMap(data => this.bindMessageHandler(data, handlers, process)),
        filter(result => result),
      )
      .subscribe(response => client.send(JSON.stringify(response)));
  }
  bindMessageHandler(
    buffer,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ): Observable<any> {
    console.log('message')

    const message = JSON.parse(buffer.data);
    const messageHandler = handlers.find(
      handler => handler.message === message.event,
    );
    if (!messageHandler) {
      return EMPTY;
    }
    console.log(message)

    return process(messageHandler.callback(message.data));
  }
  close(server) {
    server.close();
  }
}