/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  private adminSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    image: true,
    role: true,
    createAt: true,
    updateAt: true,
  };

  // Find all admins
  findAll(): Promise<Admin[]> {
    return this.prisma.admin.findMany({ select: this.adminSelect });
  }

  // Function to check ID
  async findById(id: string): Promise<Admin> {
    const record = this.prisma.admin.findUnique({
      where: { id },
      select: this.adminSelect,
    });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }
    return record;
  }

  // Find Admin By ID
  async findOne(id: string): Promise<Admin> {
    return this.findById(id);
  }

  // Create Admin
  async create(CreateAdminDto: CreateAdminDto): Promise<Admin> {
    if (CreateAdminDto.password != CreateAdminDto.confirmpassword) {
      throw new BadRequestException('A senhas digitadas não são iguais.');
    }

    delete CreateAdminDto.confirmpassword;

    const data: Admin = {
      ...CreateAdminDto,
      password: await bcrypt.hash(CreateAdminDto.password, 8),
    };

    const createdAdmin = await this.prisma.admin
      .create({ data, select: this.adminSelect })
      .catch(handleError);
    return { ...createdAdmin };
  }

  // Update Admin
  async update(id: string, updateAdmindto: UpdateAdminDto) {
    await this.findOne(id);
    const data: any = { ...updateAdmindto };
    return this.prisma.admin.update({ data, where: { id } });
  }

  // Remove Admin
  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.admin.delete({ where: { id } });
    return `Registro do Admin com o ID:${id} deletado com sucesso`;
  }
}
