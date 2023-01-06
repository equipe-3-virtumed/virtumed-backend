import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  findOne(id: string) {
    return `This action returns a #${id} room`;
  }

  remove(id: string) {
    return `This action removes a #${id} room`;
  }
}
