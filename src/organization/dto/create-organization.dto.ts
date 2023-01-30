import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateOrganizationDto {
  // NAME
  @ApiProperty({
    description: 'Nome da Organization (Hospital / Clínica)',
    example: 'Hospital das Clínicas',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  // LOGIN
  @ApiProperty({
    description: 'Organization / Hospital / Clinic email',
    example: 'organization@virtumed.com',
  })
  @IsEmail()
  email: string;

  //PHONE NUMBER
  @ApiProperty({
    description: "Organization's phone",
    example: "+5577991141765",
  })  
  @Matches(/^((\+?55\ ?[1-9]{2}\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[6-9]{1}\d{3}\-?\d{4}))$/)
  phone: string;

  // PASSWORD
  @ApiProperty({
    description: 'Organization password',
    example: '@Abcd1234',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Too weak',
  })
  password: string;

  // CNPJ
  @ApiProperty({
    description: 'Número do CNPJ',
    example: '10.000.000/0001-01',
  })
  @IsString()
  cnpj: string;

  // IMAGE
  @ApiProperty({
    description: 'Imagem ou URL da imagem',
    example:
      'https://crbm5.gov.br/novosite/wp-content/uploads/2021/04/HCPA-site-1024x569.png',
  })
  @IsString()
  image: string;

  // CONFIRM PASSWORD
  @ApiProperty({
    description: 'Digite novamente a senha anterior',
    example: '@Abcd1234',
  })
  confirmpassword: string;
}
