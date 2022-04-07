import * as WebSocket from 'ws';

import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';

import { MessageMappingProperties } from '@nestjs/websockets';

import { Observable, fromEvent, EMPTY } from 'rxjs';

import { mergeMap, filter } from 'rxjs/operators';
export class WsAdapter implements WebSocketAdapter {
  constructor(private app: INestApplicationContext) { }
  create(port: number, options: any = {}): any {
    //将套接字实例连接到指定的端口
    console.log('ws create')
    return new WebSocket.Server({ port, ...options });
  }

  // 绑定客户端连接事件
  bindClientConnect(server, callback: Function) {

    console.log('ws bindClientConnect, server:\n', server);

    server.on('connection', callback);

  }

  // 将传入的消息绑定到适当的消息处理程序
  bindMessageHandlers(

    client: WebSocket,

    handlers: MessageMappingProperties[],

    process: (data: any) => Observable<any>,

  ) {

    console.log('[waAdapter]有新的连接进来')

    fromEvent(client, 'message')
      .pipe(
        mergeMap(data => this.bindMessageHandler(client, data, handlers, process)),
        filter(result => result),
      ).subscribe(response => client.send(JSON.stringify(response)));

  }
  bindMessageHandler(
    client: WebSocket,
    buffer,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ): Observable<any> {

    let message = null;

    try {
      message = JSON.parse(buffer.data);

    } catch (error) {

      console.log('ws解析json出错', error);

      return EMPTY;

    }
    const messageHandler = handlers.find(

      handler => handler.message === message.event,

    );

    if (!messageHandler) {

      return EMPTY;

    }

    return process(messageHandler.callback(message.data));

  }
  close(server) {

    console.log('ws server close');

    server.close();

  }

}
