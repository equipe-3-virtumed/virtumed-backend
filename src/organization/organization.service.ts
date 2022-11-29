import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const record = this.prisma.organization.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(
        `registro da organização com o ID: ${id} não encontrado`
      );
    }
    return record;
  }

  findAll() {
    return this.prisma.organization.findMany();
  }

  async create(createOrganizationDto: CreateOrganizationDto) {
    const organization: any = { ...CreateOrganizationDto };
    return this.prisma.organization
      .create({ data: organization })
      .catch(this.handleError);
  }
  handleError(error: Error) {
    console.log(error);
    return undefined;
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    await this.findOne(id);
    const data: any = { ...updateOrganizationDto };
    return this.prisma.organization.update({ data, where: { id } });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.organization.delete({ where: { id } });
    return `Registro da Organização com o ID:${id} deletado com sucesso`;
  }
}
