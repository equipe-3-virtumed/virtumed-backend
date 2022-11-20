import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const record = this.prisma.admin.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(
        `registro do Adm com o ID: ${id} não encontrado`
      );
    }
    return record;
  }

  findAll() {
    return this.prisma.admin.findMany();
  }

  async create(CreateAdminDto: CreateAdminDto) {
    const admin: any = { ...CreateAdminDto };
    return this.prisma.admin
      .create({
        data: admin,
      })
      .catch(this.handleError);
  }
  handleError(error: Error) {
    console.log(error);
    return undefined;
  }

  async update(id: string, updateAdmindto: UpdateAdminDto) {
    await this.findOne(id);
    const data: any = { ...updateAdmindto };
    return this.prisma.admin.update({ data, where: { id } });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.admin.delete({ where: { id } });
    return `Registro do Admin com o ID:${id} deletado com sucesso`;
  }
}
