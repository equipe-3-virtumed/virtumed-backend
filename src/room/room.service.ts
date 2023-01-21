import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Doctor, Organization, Patient, Room } from '@prisma/client';
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

  async findAll(
    user: Organization | Doctor | Patient,
  ): Promise<Room[] | Room | string> {
    if (user.role === 'organization') {
      return await this.prisma.room.findMany({
        where: { organizationId: user.id },
      });
    }

    if (user.role === 'doctor') {
      return await this.prisma.room.findMany({
        where: { doctorId: user.id },
      });
    }

    if (user.role === 'patient') {
      return await this.prisma.room.findMany({
        where: { patientId: user.id },
      });
    }

    throw new UnauthorizedException(
      'You cannot view or create an appointment to another patient or a patient outside your organization',
    );
  }

  async connect(roomId: string, user: Patient | Doctor) {
    const {
      doctorId,
      doctorVideoToken,
      doctorChatToken,
      patientId,
      patientVideoToken,
      patientChatToken,
    } = await this.findOne(roomId, user);

    if (user.id === doctorId) {
      if (doctorVideoToken && doctorChatToken) {
        return { doctorVideoToken, doctorChatToken };
      } else {
        const { videoToken, chatToken } = await getTwilioToken(user, roomId);
        const doctorVideoToken = videoToken;
        const doctorChatToken = chatToken;
        const updateRoom = { doctorVideoToken, doctorChatToken };
        await this.update(roomId, user, true, updateRoom);
        return { videoToken, chatToken };
      }
    }

    if (user.id === patientId) {
      if (patientVideoToken && patientChatToken) {
        return { patientVideoToken, patientChatToken };
      } else {
        const { videoToken, chatToken } = await getTwilioToken(user, roomId);
        const patientVideoToken = videoToken;
        const patientChatToken = chatToken;
        const updateRoom = { patientVideoToken, patientChatToken };
        await this.update(roomId, user, true, updateRoom);
        return { videoToken, chatToken };
      }
    }

    throw new UnauthorizedException(
      'You cannot view or create an appointment to another patient or a patient outside your organization',
    );
  }

  async update(
    roomId: string,
    user: Organization | Doctor | Patient,
    connect: boolean,
    updateRoom?: UpdateRoomDto,
  ) {
    if (!connect) {
      await this.findOne(roomId, user);
    }
    const data = { ...updateRoom };
    await this.prisma.room.update({ data, where: { id: roomId } });
  }

  remove(id: string) {
    return `This action removes a #${id} room`;
  }
}
