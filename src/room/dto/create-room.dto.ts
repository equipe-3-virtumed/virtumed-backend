import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  DoctorId: string;
  @IsNotEmpty()
  PatientId: string;
}
