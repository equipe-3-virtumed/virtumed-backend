import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('chatGateway');

  afterInit(server: any) {
    this.logger.log(`Serving on ${server}`);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    // console.log("🚀 ~ file: chat.gateway.ts:23 ~ ChatGateway ~ handleRoomJoin ~ room", room)
    client.emit('joinedRoom', client.id);
  }

  @SubscribeMessage('ready')
  handleReady(client: Socket, credentials: { roomId: string; localParticipant: string }) {
    this.wss.to(credentials.roomId).emit('readyToGo', credentials.localParticipant);
  }

  @SubscribeMessage('chatToServer')
  handleMessage(message: {
    sender: string;
    room: string;
    message: string;
    time: string;
  }) {
    this.wss.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('videoRequest')
  handleStream(client: Socket, data: { room: string; signal: any; }) {
    // console.log("🚀 ~ file: chat.gateway.ts:44 ~ ChatGateway ~ handleStream ~ data", data);
    const { signal } = data;
    const { id } = client;
    const stream = { signal, id}
    this.wss.to(data.room).emit('videoStream', stream);
  }
}
