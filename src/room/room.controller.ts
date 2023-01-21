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
import { Doctor, Organization, Patient, Room } from '@prisma/client';

@ApiTags('Room')
@ApiBearerAuth()
@UseGuards(AuthGuard(['Global']))
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(
    @Body() data: CreateRoomDto,
    @LoggedUser() user: Organization | Doctor | Patient,
  ): Promise<Room> {
    return await this.roomService.create(data, user);
  }

  @Get(':roomId')
  async findOne(
    @Param('roomId') roomId: string,
    @LoggedUser() user: Organization | Doctor | Patient,
  ): Promise<Room> {
    return await this.roomService.findOne(roomId, user);
  }

  @UseGuards(AuthGuard(['Patient', 'Doctor']))
  @Get('connect/:roomId')
  async connect(
    @Param('roomId') roomId: string,
    @LoggedUser() user: Patient | Doctor,    
  ) {
    return await this.roomService.connect(roomId, user);
  }

  @UseGuards(AuthGuard(['Patient', 'Doctor', 'Organization']))
  @Patch(':roomId')
  async update(
    @Param('roomId') roomId: string,
    @LoggedUser() user: Organization | Doctor | Patient,
    @Body() updateRoom: UpdateRoomDto,
  ) {
    return await this.roomService.update(roomId, user, false, updateRoom);
  }

  @Delete(':roomId')
  async remove(@Param('roomId') roomId: string) {
    return await this.roomService.remove(roomId);
  }
}
