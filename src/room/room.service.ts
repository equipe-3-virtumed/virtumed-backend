import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { getTwilioToken } from './getToken.twilio.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  create(createRoomDto: CreateRoomDto) {
    return 'This action schedule a new room';
  }

  findOne(userId: string, roomId: string) {
    const room = this.prisma.room.findUniqueOrThrow({
      where: { id: roomId },
    }); // continue... 
  }

  connect(userId: string, roomId: string) {
    return getTwilioToken(userId, roomId);
  }

  update(userId: string, roomId: UpdateRoomDto) {
    return 'This action updates a room';
  }

  remove(id: string) {
    return `This action removes a #${id} room`;
  }
}
