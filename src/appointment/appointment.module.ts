import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DoctorService } from "src/doctor/doctor.service";
import { PatientService } from "src/patient/patient.service";

@Module({
  imports: [PrismaModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, DoctorService, PatientService],
})
export class AppointmentModule {}
