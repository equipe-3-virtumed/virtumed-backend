import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  // NAME
  @ApiProperty({
    description: "Admin's name",
    example: 'virtumed',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  
  //PHONE NUMBER
  @ApiProperty({
    description: "Admin's phone",
    example: "+5577991747578",
  })  
  @Matches(/^((\+?55\ ?[1-9]{2}\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[6-9]{1}\d{3}\-?\d{4}))$/)
  phone: string;

  // LOGIN
  @ApiProperty({
    description: "Admin's login",
    example: 'admin@virtumed.com',
  })
  @IsEmail()
  email: string;


  // PASSWORD
  @ApiProperty({
    description: "Admin's password",
    example: '@Abcd1234',
  })
  @MinLength(8)
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
    description: 'Image file or URL',
    example:
      'https://crbm5.gov.br/novosite/wp-content/uploads/2021/04/HCPA-site-1024x569.png',
  })
  @IsUrl()
  @IsString()
  image: string;
}
