import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateOrganizationDto {
  // NAME
  @ApiProperty({
    description: "Nome da Organization (Hospital / Clínica)",
    example: "Hospital das Clínicas",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  // LOGIN
  @ApiProperty({
    description: "Organization / Hospital / Clinic email",
    example: "email@organization.com",
  })
  @IsEmail()
  email: string;

  // PASSWORD
  @ApiProperty({
    description: "Admin password",
    example: "@Abcd1234",
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Too weak",
  })
  password: string;

  // CNPJ
  @ApiProperty({
    description: "Número do CNPJ",
    example: "10.000.000/0001-01",
  })
  @IsString()
  cnpj: string;
  
  // IMAGE
  @ApiProperty({
    description: "Imagem ou URL da imagem",
    example:
      "https://crbm5.gov.br/novosite/wp-content/uploads/2021/04/HCPA-site-1024x569.png",
  })
  @IsString()
  image: string;

  // ROLE
  @ApiProperty({
    description: "Função no sistema",
    example: "organization",
  })
  @IsString()
  role: string;
}
