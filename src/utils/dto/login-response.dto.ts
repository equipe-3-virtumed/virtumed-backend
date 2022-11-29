import { ApiProperty } from "@nestjs/swagger";
import { Admin } from "src/admin/entities/admin.entity";
import { Doctor } from "src/doctor/entities/doctor.entity";
import { Patient } from "src/patient/entities/patient.entity";

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT generated by login',
    example: 'TOKEN_GENERATED_AUTOMATICALLY',
  })
  token: string;

  @ApiProperty({
    description: 'Authenticated client data',
  })
      client: Admin | Doctor | Patient
    }