import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreatePatientDto {
  // NAME
  @ApiProperty({
    description: 'Patient`s name',
    example: 'Hashirama',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  // LOGIN
  @ApiProperty({
    description: 'Patient`s login',
    example: 'patient@virtumed.com',
  })
  @IsEmail()
  email: string;

  // CPF
  @ApiProperty({
    description: 'Patient CPF',
    example: '000.000.000-00',
  })
  cpf: string;

  // PASSWORD
  @ApiProperty({
    description: "Patient's password",
    example: '@Abcd1234',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Too weak',
  })
  password: string;

  // CONFIRM PASSWORD
  @ApiProperty({
    description: 'Digite novamente a senha anterior',
    example: '@Abcd1234',
  })
  confirmpassword: string;

  // IMAGE
  @ApiProperty({
    description: 'Link Image patient',
    example: 'url',
  })
  image: string;
}
