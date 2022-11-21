import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const record = this.prisma.doctor.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(
        `registro do Médico com o ID: ${id} não encontrado`
      );
    }
    return record;
  }

  findAll() {
    return this.prisma.doctor.findMany();
  }

  async create(createDoctorDto: CreateDoctorDto) {
    const doctor: any = { ...CreateDoctorDto };
    return this.prisma.doctor.create({ data: doctor }).catch(this.handleError);
  }
  handleError(error: Error) {
    console.log(error);
    return undefined;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    await this.findOne(id);
    const data: any = { ...updateDoctorDto };
    return this.prisma.doctor.update({ data, where: { id } });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.doctor.delete({ where: { id } });
    return `Registro do Médico com o ID:${id} deletado com sucesso`;
  }
}
