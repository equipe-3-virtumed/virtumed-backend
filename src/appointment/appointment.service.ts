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

    if (
      user.id === patientId ||
      user.id === doctorId ||
      user.id === organizationId
    ) {
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
      user.id === appointment.doctorId ||
      user.id === appointment.organizationId
    ) {
      return appointment;
    }

    throw new UnauthorizedException(
      'FIND ONE You cannot view or create an appointment to another patient or a patient outside your organization',
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
    const { doctorId, doctorVideoToken, patientId, patientVideoToken } =
      await this.findOne(appointmentId, user);

    if (user.id === doctorId) {
      if (doctorVideoToken) {
        const videoToken = doctorVideoToken;
        return videoToken;
      } else {
        const videoToken = await this.getToken.GetToken(appointmentId);
        const doctorVideoToken = videoToken;
        await this.update(appointmentId, user, { doctorVideoToken });
        return videoToken;
      }
    }

    if (user.id === patientId) {
      if (patientVideoToken) {
        const videoToken = patientVideoToken;
        return videoToken;
      } else {
        const videoToken = await this.getToken.GetToken(appointmentId);
        const patientVideoToken = videoToken;
        await this.update(appointmentId, user, { patientVideoToken });
        return videoToken;
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
