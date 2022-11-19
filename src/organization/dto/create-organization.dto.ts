import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateOrganizationDto {
  @ApiProperty({
    description: "Nome da Organization (Hospital / Clínica)",
    example: "Hospital das Clínicas"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Organization / Hospital / Clinic email",
    example: "email@organization.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Admin password",
    example: "@Abcd1234",
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Too weak",
  })
  password: string;

  @ApiProperty({
    description: "Número do CNPJ",
    example: "10.000.000/0001-01"
  })
  @IsString()
  cnpj: string;

  @ApiProperty({
    description: "Imagem ou URL da imagem",
    example: "https://crbm5.gov.br/novosite/wp-content/uploads/2021/04/HCPA-site-1024x569.png"
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: "Função no sistema",
    example: "organization"
  })
  @IsString()
  role: string;
}
