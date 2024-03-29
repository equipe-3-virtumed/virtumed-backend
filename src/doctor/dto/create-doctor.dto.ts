import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateDoctorDto {
  // NAME
  @ApiProperty({
    description: "Doctor's name",
    example: 'Dr Rogerinho',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  // CRM
  @ApiProperty({
    description: "Doctor's document",
    example: 'CRM/BA.123456',
  })
  crm: string;

  //PHONE NUMBER
  @ApiProperty({
    description: "Doctor's phone",
    example: "+5577971141667",
  })  
  @Matches(/^((\+?55\ ?[1-9]{2}\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[6-9]{1}\d{3}\-?\d{4}))$/)
  phone: string;

  // LOGIN
  @ApiProperty({
    description: "Doctor's email",
    example: 'doctor@virtumed.com',
  })
  @IsEmail()
  email: string;

  // PASSWORD
  @ApiProperty({
    description: "Doctor's password",
    example: '@Abcd1234',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Too weak',
  })
  password: string;

  // CONFIRM PASSWORD
  @ApiProperty({
    description: 'Password confirmation',
    example: '@Abcd1234',
  })
  confirmpassword: string;

  // IMAGE
  @ApiProperty({
    description: 'Image URL or file',
    example:
      'https://crbm5.gov.br/novosite/wp-content/uploads/2021/04/HCPA-site-1024x569.png',
  })
  @IsString()
  image: string;
}
