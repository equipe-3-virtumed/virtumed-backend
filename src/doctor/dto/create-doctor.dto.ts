import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateDoctorDto {
  // NAME
  @ApiProperty({
    description: 'Doctor name',
    example: 'Dr Rogerinho',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  // LOGIN
  @ApiProperty({
    description: "Doctor's login",
    example: 'email@admin.com',
  })
  @IsEmail()
  email: string;

  // CRM
  @ApiProperty({
    description: 'Doctor`s document',
    example: 'CRM/BA.123456',
  })
  crm: string;

  // PASSWORD
  @ApiProperty({
    description: "Admin's password",
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
    description: 'Imagem ou URL da imagem',
    example:
      'https://crbm5.gov.br/novosite/wp-content/uploads/2021/04/HCPA-site-1024x569.png',
  })
  @IsString()
  image: string;
}
