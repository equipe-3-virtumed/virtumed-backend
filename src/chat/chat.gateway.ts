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
  handleRoomJoin(socket: Socket, room: string) {
    socket.join(room);
    socket.emit('joinedRoom', socket.id);
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

  @SubscribeMessage('emitId')
  getId(socket: Socket, room: string) {
    this.wss.to(room).emit('emitId', socket.id)
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(socket: Socket) {
    socket.broadcast.emit('callended');
  }

  @SubscribeMessage('calluser')
  callUser({ userToCall, signalData, from, name }) {
    this.wss
      .to(userToCall)
      .emit('calluser', { signal: signalData, from, name });
  }

  @SubscribeMessage('answercall')
  answerCall(data) {
    this.wss.to(data.to).emit('callaccepted', data.signal);
  }
}
