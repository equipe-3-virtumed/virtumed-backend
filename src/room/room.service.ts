import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin, Doctor, Organization, Patient, Room } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { getTwilioToken } from './get.twilio.token.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateRoomDto,
    user: Organization | Doctor | Patient,
  ): Promise<Room> {
    const { patientId, doctorId, organizationId, appointmentTime } = data;

    if (user.id === patientId || doctorId || organizationId) {
      const scheduledAppointment = await this.prisma.room.create({ data });
      return scheduledAppointment;
    }

    throw new UnauthorizedException(
      'You cannot view or create an appointment to another patient or a patient outside your organization',
    );
  }

  async findOne(
    roomId: string,
    user: Organization | Doctor | Patient,
  ): Promise<Room> {
    const room = await this.prisma.room.findUniqueOrThrow({
      where: { id: roomId },
    });

    if (user.id === room.patientId || room.doctorId || room.organizationId) {
      return room;
    }

    throw new UnauthorizedException(
      'You cannot view or create an appointment to another patient or a patient outside your organization',
    );
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
