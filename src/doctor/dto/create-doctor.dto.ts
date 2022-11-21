import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateDoctorDto {
  // NAME
  @ApiProperty({
    description: "Doctor name",
    example: "Dr Rogerinho",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  // LOGIN
  @ApiProperty({
    description: "Doctor's login",
    example: "email@admin.com",
  })
  @IsEmail()
  email: string;

  // CRM
  @ApiProperty({
    description: "Doctor`s document",
    example: "CRM/BA.123456",
  })
  crm: string;

  // PASSWORD
  @ApiProperty({
    description: "Admin's password",
    example: "@Abcd1234",
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Too weak",
  })
  password: string;

  //IMAGE
  @ApiProperty({
    description: "Link image Doctor",
    example: "url",
  })
  image: string;

  // ROLE
  @ApiProperty({
    description: "Função no sistema",
    example: "doctor",
  })
  @IsString()
  role: string;
}
