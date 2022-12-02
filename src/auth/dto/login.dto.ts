import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Login',
    example: 'admin@virtumed.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'user password for authentication',
    example: 'AB@123cd',
  })
  password: string;
}

export class LoginOrganizationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Login',
    example: 'organization@virtumed.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'user password for authentication',
    example: 'AB@123cd',
  })
  password: string;
}

export class LoginDoctorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Login',
    example: 'doctor@virtumed.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'user password for authentication',
    example: 'AB@123cd',
  })
  password: string;
}

export class LoginPatientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Login',
    example: 'patient@virtumed.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'user password for authentication',
    example: 'AB@123cd',
  })
  password: string;
}