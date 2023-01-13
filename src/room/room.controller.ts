import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from "@nestjs/passport";

@ApiTags('Room')
@ApiBearerAuth()
@UseGuards(AuthGuard('Global'))
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }


  @Get(':roomId')
  findOne(@Param('roomId') roomId: string, @Body() userId: string) {
    return this.roomService.findOne(userId, roomId);
  }

  @Get('connect/:roomId')
  connect(@Param('roomId') roomId: string, @Body() userId: string) {
    return this.roomService.connect(userId, roomId);
  }

  @Patch(':roomId')
  update(@Param('roomId') roomId: UpdateRoomDto, @Body() userId: string) {
    return this.roomService.update(userId, roomId)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.roomService.findOne(roomId);
  // }

  @Delete(':roomId')
  remove(@Param('roomId') roomId: string) {
    return this.roomService.remove(roomId);
  }
}

