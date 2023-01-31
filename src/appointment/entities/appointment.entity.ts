
import { Doctor } from "src/doctor/entities/doctor.entity";
import { Patient } from "src/patient/entities/patient.entity";

export class Appointment {
  id?: string;
  open?: boolean;
  organizationId: string;
  doctorId: string;
  patientId: string;
  appointmentTime: Date;
}

export class JoinAppointment {
  appointment: Appointment;
  patient: Patient;
  doctor: Doctor;
  userRole: string;
}