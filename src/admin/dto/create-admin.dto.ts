import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, Matches } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    description: "Admin`s name",
    example: "virtumed",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Admin`s login",
    example: "virtumeds2@equipe3.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Admin password",
    example: "virtumed@123",
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Too weak",
  })
  password: string;
}
