import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin, Doctor, Organization, Patient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { getTwilioToken } from './getToken.twilio.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(
    createRoomDto: CreateRoomDto,
    user: Organization | Doctor | Patient,
  ) {
    const { patientId, doctorId, organizationId, appointmentTime } = createRoomDto;

    if (
      (user.role === 'patient' && user.id !== patientId) ||
      (user.role === 'doctor' && user.id !== doctorId) ||
      (user.role === 'organization' && user.id !== organizationId)
    ) {
      throw new UnauthorizedException(
        'A patient cannot create an appointment to another patient',
      );
    }

    const appointment = await this.prisma.room.create; //continue...

    return 'This action schedule a new room';
  }

  findOne(userId: string, roomId: string) {
    const room = this.prisma.room.findUniqueOrThrow({
      where: { id: roomId },
    });

    return room;
  }

  connect(user: Patient | Doctor, roomId: string) {
    return getTwilioToken(user, roomId);
  }

  update(userId: string, roomId: UpdateRoomDto) {
    return 'This action updates a room';
  }

  remove(id: string) {
    return `This action removes a #${id} room`;
  }
}
