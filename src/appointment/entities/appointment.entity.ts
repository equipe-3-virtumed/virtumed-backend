export class Appointment {
  id?: string;
  open?: boolean;
  organizationId: string;
  doctorId: string;
  doctorVideoToken?: string;
  patientId: string;
  patientVideoToken?: string;
}
