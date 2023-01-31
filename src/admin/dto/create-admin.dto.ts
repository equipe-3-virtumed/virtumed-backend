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
