import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const record = this.prisma.patient.findUnique({ where: { id }})
    if(!record){
      throw new NotFoundException(
        `registro do paciente com o ID: ${id} não encontrado`
      )
    }
    return record;
  }

  findAll() {
    return this.prisma.patient.findMany();
  }

  async create(createPatientDto: CreatePatientDto) {
    const patient: any = { ...CreatePatientDto };
    return this.prisma.patient.create({ data: patient}).catch(this.handleError);
  }
  handleError(error: Error) {
    console.log(error);
    return undefined;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    await this.findOne(id)
    const data: any = { ...updatePatientDto };
    return this.prisma.patient.update({data, where: {id}});
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.prisma.patient.delete({where: {id}})
    return `Registro do paciente com o ID:${id} deletado com sucesso`;
  }
}
