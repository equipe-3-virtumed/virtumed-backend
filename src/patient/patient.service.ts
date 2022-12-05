import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  private patientSelect = {
    id: true,
    name: true,
    cpf: true,
    email: true,
    password: false,
    image: true,
    role: true,
    createAt: true,
    updateAt: true,
  };

  // Find all patients
  findAll(): Promise<Patient[]> {
    return this.prisma.patient.findMany({ select: this.patientSelect });
  }

  // Function to check ID
  async findById(id: string): Promise<Patient> {
    const record = this.prisma.patient.findUnique({
      where: { id },
      select: this.patientSelect,
    });
    if (!record) {
      throw new NotFoundException(
        `registro do paciente com o ID: ${id} não encontrado`,
      );
    }
    return record;
  }

  // Find Patient By ID
  async findOne(id: string): Promise<Patient> {
    return this.findById(id);
  }

  // Create Patient
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    if (createPatientDto.password != createPatientDto.confirmpassword) {
      throw new BadRequestException('A senhas digitadas não são iguais.');
    }

    delete createPatientDto.confirmpassword;

    const data: Patient = {
      ...createPatientDto,
      password: await bcrypt.hash(createPatientDto.password, 8),
    };

    const createPatient = await this.prisma.patient
      .create({ data, select: this.patientSelect })
      .catch(handleError);
    return { ...createPatient };
  }

  // Update Patient
  async update(id: string, updatePatientDto: UpdatePatientDto) {
    await this.findOne(id);
    const data: any = { ...updatePatientDto };
    return this.prisma.patient.update({ data, where: { id } });
  }

  // Remove Patient
  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.patient.delete({ where: { id } });
    return `Registro do paciente com o ID:${id} deletado com sucesso`;
  }
}
