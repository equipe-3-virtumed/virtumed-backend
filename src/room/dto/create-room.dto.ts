import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601, IsNotEmpty, IsString } from "class-validator";

export class CreateRoomDto {
  open?: boolean;

  @ApiProperty({
    description: "Doctor's Organization ID",
    example: "4f3f6d83-2c0e-41ac-aaaf-3be209f8d52c",
  })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({
    description: "Doctor's ID",
    example: "16a49239-0d77-4519-934f-90af0beeca3b",
  })
  @IsString()
  @IsNotEmpty()
  doctorId: string;
  doctorVideoToken?: string;
  doctorChatToken?: string;

  @ApiProperty({
    description: "Patient's ID",
    example: "fd44bd4b-baa9-4411-a4be-27326cef694b",
  })
  @IsString()
  @IsNotEmpty()
  patientId: string;
  patientVideoToken?: string;
  patientChatToken?: string;

  @ApiProperty({
    description: "Scheduled time for the appointment",
    example: "2023-01-09T10:39:48.600Z",
  })
  @IsISO8601()
  @IsNotEmpty()
  appointmentTime: Date;
}
