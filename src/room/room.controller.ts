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
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/strategies/logged.decorator';
import { Doctor, Organization, Patient } from '@prisma/client';

@ApiTags('Room')
@ApiBearerAuth()
@UseGuards(AuthGuard(['Global']))
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(
    @Body() createRoomDto: CreateRoomDto,
    @LoggedUser() user: Organization | Doctor | Patient,
  ) {
    return await this.roomService.create(createRoomDto, user);
  }

  @Get(':roomId')
  findOne(@Param('roomId') roomId: string, @Body() userId: string) {
    return this.roomService.findOne(userId, roomId);
  }

  @UseGuards(AuthGuard(['Patient', 'Doctor']))
  @Get('connect/:roomId')
  connect(
    @LoggedUser() user: Patient | Doctor,
    @Param('roomId') roomId: string,
  ) {
    return this.roomService.connect(user, roomId);
  }

  @Patch(':roomId')
  update(@Param('roomId') roomId: UpdateRoomDto, @Body() userId: string) {
    return this.roomService.update(userId, roomId);
  }

  @Delete(':roomId')
  remove(@Param('roomId') roomId: string) {
    return this.roomService.remove(roomId);
  }
}
