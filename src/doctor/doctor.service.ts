import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  private doctorSelect = {
    id: true,
    name: true,
    email: true,
    crm: true,
    password: false,    
    role: true,
    image: true,
    createAt: true,
    updateAt: true,
  };
  // Find all doctors
  findAll() {
    return this.prisma.doctor.findMany({ select: this.doctorSelect });
  }

  // Function to check ID
  async findById(id: string): Promise<Doctor> {
    const record = await this.prisma.doctor.findUnique({
      where: { id },
      select: this.doctorSelect,
    });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }
    return record;
  }

  // Find Doctor By ID
  async findOne(id: string): Promise<Doctor> {
    return await this.findById(id);
  }

  // Create Doctor
  async create(CreateDoctorDto: CreateDoctorDto): Promise<Doctor> {
    if (CreateDoctorDto.password != CreateDoctorDto.confirmpassword) {
      throw new BadRequestException('A senhas digitadas não são iguais.');
    }

    delete CreateDoctorDto.confirmpassword;

    const data: Doctor = {
      ...CreateDoctorDto,
      password: await bcrypt.hash(CreateDoctorDto.password, 8),
    };

    const createdDoctor = await this.prisma.doctor
      .create({ data, select: this.doctorSelect })
      .catch(handleError);
    return { ...createdDoctor };
  }

// Update Doctor
  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    await this.findOne(id);
    const data: any = { ...updateDoctorDto };
    return this.prisma.doctor.update({ data, where: { id } });
  }

  // Remove Doctor
  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.doctor.delete({ where: { id } });
    return `Registro do Médico com o ID:${id} deletado com sucesso`;
  }
}
