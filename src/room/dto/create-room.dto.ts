import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Doctor ID',
    example: 'ab369186-6688-4af1-b87a-2e65d22771d5',
  })
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({
    description: 'Patient ID',
    example: '46eef1a1-e1c0-4e5e-bb2c-e3390f0dff30',
  })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({
    description: 'Patient ID',
    example: '2023-01-09T10:39:48.600Z',
  })
  @IsISO8601()
  @IsNotEmpty()
  appointmentTime: Date;
}
