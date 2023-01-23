export class Room {
  id?: string;
  open: boolean;
  organizationId: string;
  doctorId: string;
  doctorVideoToken?: string;
  doctorChatToken?: string;
  patientId: string;
  patientVideoToken?: string;
  patientChatToken?: string;
}
