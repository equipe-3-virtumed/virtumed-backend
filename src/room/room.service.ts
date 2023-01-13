import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Doctor, Organization, Patient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { getTwilioToken } from './getToken.twilio.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto, user: Organization | Doctor | Patient) {
    const { patientId, doctorId, appointmentTime } = createRoomDto;

    if (user.role === 'patient') {
      if (user.id !== patientId) {
        throw new UnauthorizedException(
          'A patient cannot create an appointment to another patient',
        );
      }
    }
    
    const appointment = await this.prisma.room.create

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
