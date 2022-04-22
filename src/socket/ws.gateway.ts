
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
@WebSocketGateway(3008, {
  // 域名
  // namespace: '/webSocket',
  path: '/webSocket',
  // // 解决跨域
  // allowEIO3: true,
  // cors: {
  //   origin: /.*/,
  //   credentials: true,
  // },
})
export class WsStartGateway {
  @WebSocketServer()
  server: Server
  handleConnection(client: Socket) {
    this.server.on('connect', () => {
      console.log('与服务器建立连接成功')
    })
  }
  @SubscribeMessage('hello')
  hello(@MessageBody() data: any): any {
    return {
      "event": "hello",
      "data": data,
      "msg": 'rustfisher.com'
    };
  }


  // 加入房间
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, payload) {
    // client.join(payload)
    console.log(payload)
    client.emit('joinRoom', payload)

    return{
      data:'来了'
    }
  }

  // 离开房间
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, payload) {
    client.leave(payload.roomId)
    client.emit('leaveRoom', payload.roomId)
  }

  // 接受网页发送的数据
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    console.log(payload.message)
    // 发送网页的数据给flutter端
    // client.emit('toflutter', payload.message)
    this.server.emit('toflutter', payload.message)
  }
}