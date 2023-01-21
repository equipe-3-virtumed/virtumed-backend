export class Room {
  id?: string;
  organizationId: string;
  doctorId: string;
  doctorVideoToken?: string;
  doctorChatToken?: string;
  patientId: string;
  patientVideoToken?: string;
  patientChatToken?: string;
}
