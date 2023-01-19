import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreatePatientDto {
  // NAME
  @ApiProperty({
    description: "Patient's name",
    example: 'Hashirama',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  // CPF
  @ApiProperty({
    description: "Patient's CPF",
    example: '000.000.000-00',
  })
  cpf: string;

  //PHONE NUMBER
  @ApiProperty({
    description: "Patient's phone",
    example: "+5511912345678",
  })
  // @IsMobilePhone('pt-BR')
  phone: string;

  // LOGIN
  @ApiProperty({
    description: "Patient's email",
    example: 'patient@virtumed.com',
  })
  @IsEmail()
  email: string;

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
    description: 'Password confirmation',
    example: '@Abcd1234',
  })
  confirmpassword: string;

  // IMAGE
  @ApiProperty({
    description: 'Image URL or file',
    example: 'url',
  })
  image: string;
}
