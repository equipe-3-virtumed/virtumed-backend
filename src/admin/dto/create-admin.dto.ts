import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, Matches } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    description: "Admin's name",
    example: "virtumed",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Admin's login",
    example: "email@admin.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Admin's password",
    example: "@Abcd1234",
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Too weak",
  })
  password: string;
  
  @ApiProperty({
    description: "Link da iamgem",
    example: "url",
  })
  image: string
}
