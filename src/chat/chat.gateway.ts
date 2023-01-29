import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('chatGateway');

  afterInit(server: any) {
    this.logger.log(`Serving on ${server}`);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    console.log(
      '🚀 ~ file: chat.gateway.ts:28 ~ ChatGateway ~ handleRoomJoin ~ client',
      client.rooms,
    );
    console.log(
      '🚀 ~ file: chat.gateway.ts:28 ~ ChatGateway ~ handleRoomJoin ~ room',
      room,
    );

    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string; time: string },
  ) {
    console.log(message.room);
    console.log(message);
    console.log(message.time);
    this.wss.to(message.room).emit('chatToClient', message);
  }

  // @SubscribeMessage('createChat')
  // create(@MessageBody() createChatDto: CreateChatDto) {
  //   return this.chatService.create(createChatDto);
  // }

  // @SubscribeMessage('findAllChat')
  // findAll() {
  //   return this.chatService.findAll();
  // }

  // @SubscribeMessage('findOneChat')
  // findOne(@MessageBody() id: number) {
  //   return this.chatService.findOne(id);
  // }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(updateChatDto.id, updateChatDto);
  // }

  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatService.remove(id);
  // }
}
