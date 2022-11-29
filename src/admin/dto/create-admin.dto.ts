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
    description: 'Digite novamente a senha anterior',
    example: '@Abcd1234',
  })
  confirmPassword: string;

  // IMAGE
  @IsUrl()
  @ApiProperty({
    description: 'Link Image Admin',
    example: 'url',
  })
  image: string;

  // ROLE
  @ApiProperty({
    description: 'Função no sistema',
    example: 'admin',
  })
  @IsString()
  role: string;
}
