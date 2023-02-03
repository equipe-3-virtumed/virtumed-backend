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
  handleMessage(
    socket: Socket,
    message: {
      sender: string;
      room: string;
      message: string;
      time: string;
    },
  ) {
    this.wss.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('emitId')
  getId(socket: Socket, room: string) {
    this.wss.to(room).emit('emittedId', socket.id);
  }

  @SubscribeMessage('roomReady')
  setReady(socket: Socket, room: string) {
    this.wss.to(room).emit('roomReady');
  }

  @SubscribeMessage('calluser')
  callUser(socket: Socket, callData: { userToCall: string; signalData: any }) {
    this.wss
      .to(callData.userToCall)
      .emit('usercalling', { signal: callData.signalData, from: socket.id });
  }

  @SubscribeMessage('answercall')
  answerCall(socket: Socket, { signal, to }) {
    this.wss.to(to).emit('callaccepted', signal);
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(socket: Socket) {
    socket.broadcast.emit('callended');
  }
}
