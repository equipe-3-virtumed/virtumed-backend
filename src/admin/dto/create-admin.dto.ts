import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, Matches } from "class-validator";

export class CreateAdminDto {
  // NAME
  @ApiProperty({
    description: "Admin's name",
    example: "virtumed",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  // LOGIN
  @ApiProperty({
    description: "Admin's login",
    example: "admin@virtumed.com",
  })
  @IsEmail()
  email: string;

  // PASSWORD
  @ApiProperty({
    description: "Admin's password",
    example: "@Abcd1234",
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Too weak",
  })
  password: string;

  // IMAGE
  @ApiProperty({
    description: "Link Image Admin",
    example: "url",
  })
  image: string;

  // ROLE
  @ApiProperty({
    description: "Função no sistema",
    example: "admin",
  })
  @IsString()
  role: string;
}
