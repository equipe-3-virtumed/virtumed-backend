import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Doctor, Organization, Patient, Appointment } from '@prisma/client';
import { DoctorService } from "src/doctor/doctor.service";
import { PatientService } from 'src/patient/patient.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JoinAppointment } from "./entities/appointment.entity";

@Injectable()
export class AppointmentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
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
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) throw new NotFoundException('Appointment not found');

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

  async connect(
    appointmentId: string,
    user: Patient | Doctor,
  ): Promise<JoinAppointment> {
    const appointment = await this.findOne(appointmentId, user);

    if (user.id === appointment.doctorId) {
      const patient = await this.patientService.findById(appointment.patientId);
      const doctor = await this.doctorService.findById(appointment.doctorId);
      return { appointment, patient, doctor, userRole: 'doctor' };
    }

    if (user.id === appointment.patientId) {
      const patient = await this.patientService.findById(appointment.patientId);
      const doctor = await this.doctorService.findById(appointment.doctorId);
      return { appointment, patient, doctor, userRole: 'patient' };
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
