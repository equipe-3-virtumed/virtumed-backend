import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Doctor, Organization, Patient, Appointment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { GetTokenService } from './get.token.service';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly getToken: GetTokenService,
  ) {}

  async create(
    data: CreateAppointmentDto,
    user: Organization | Doctor | Patient,
  ): Promise<Appointment> {
    const { patientId, doctorId, organizationId } = data;

    if (user.id === patientId || doctorId || organizationId) {
      const scheduledAppointment = await this.prisma.appointment.create({
        data,
      });
      return scheduledAppointment;
    }

    throw new UnauthorizedException(
      'You cannot view or create an appointment to another patient or a patient outside your organization',
    );
  }

  async findOne(
    appointmentId: string,
    user: Organization | Doctor | Patient,
  ): Promise<Appointment> {
    const appointment = await this.prisma.appointment.findUniqueOrThrow({
      where: { id: appointmentId },
    });

    if (
      user.id === appointment.patientId ||
      appointment.doctorId ||
      appointment.organizationId
    ) {
      return appointment;
    }

    throw new UnauthorizedException(
      'You cannot view or create an appointment to another patient or a patient outside your organization',
    );
  }

  async findAll(
    user: Organization | Doctor | Patient,
  ): Promise<Appointment[] | Appointment | string> {
    if (user.role === 'organization') {
      return await this.prisma.appointment.findMany({
        where: { organizationId: user.id },
      });
    }

    if (user.role === 'doctor') {
      return await this.prisma.appointment.findMany({
        where: { doctorId: user.id },
      });
    }

    if (user.role === 'patient') {
      return await this.prisma.appointment.findMany({
        where: { patientId: user.id },
      });
    }

    throw new UnauthorizedException(
      'You cannot view or create an appointment to another patient or a patient outside your organization',
    );
  }

  async connect(appointmentId: string, user: Patient | Doctor) {
    const {
      doctorId,
      doctorVideoToken,
      patientId,
      patientVideoToken,
      roomId
    } = await this.findOne(appointmentId, user);

    if (user.id === doctorId) {
      if (doctorVideoToken) {
        const videoToken = doctorVideoToken;
        return { videoToken, roomId }
      } else {
        const { roomId, videoToken } = await this.getToken.GetToken(appointmentId);
        const doctorVideoToken = videoToken;
        const updateAppointment = { doctorVideoToken, roomId };
        await this.update(appointmentId, user, updateAppointment);
        return { videoToken, roomId }
      }
    }

    if (user.id === patientId) {
      if (patientVideoToken) {
        const videoToken = patientVideoToken;
        return { videoToken, roomId }
      } else {
        const { roomId, videoToken } = await this.getToken.GetToken(appointmentId);
        const patientVideoToken = videoToken;
        const updateAppointment = { patientVideoToken, roomId };
        await this.update(appointmentId, user, updateAppointment);
        return { videoToken, roomId }
      }
    }

    throw new UnauthorizedException(
      'You cannot view or create an appointment to another patient or a patient outside your organization',
    );
  }

  async update(
    appointmentId: string,
    user: Organization | Doctor | Patient,
    updateAppointment?: UpdateAppointmentDto,
  ) {
    await this.findOne(appointmentId, user);
    const data = { ...updateAppointment };
    await this.prisma.appointment.update({
      data,
      where: { id: appointmentId },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} appointment`;
  }
}
