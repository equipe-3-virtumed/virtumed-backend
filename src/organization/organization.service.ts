import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  private organizationSelect = {
    id: true,
    name: true,
    cnpj: true,
    phone: true,
    email: true,
    password: false,
    image: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  };

  // Find all organizations
  findAll(): Promise<Organization[]> {
    return this.prisma.organization.findMany({
      select: this.organizationSelect,
    });
  }

  // Function to check ID
  async findById(id: string): Promise<Organization> {
    const record = this.prisma.organization.findUnique({
      where: { id },
      select: this.organizationSelect,
    });
    if (!record) {
      throw new NotFoundException(
        `registro da organização com o ID: ${id} não encontrado`,
      );
    }
    return record;
  }

  // Find Organization By ID
  async findOne(id: string): Promise<Organization> {
    return this.findById(id);
  }

  // Create Organization
  async create(
    CreateOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    if (
      CreateOrganizationDto.password != CreateOrganizationDto.confirmpassword
    ) {
      throw new BadRequestException('A senhas digitadas não são iguais.');
    }

    delete CreateOrganizationDto.confirmpassword;

    const data: Organization = {
      ...CreateOrganizationDto,
      password: await bcrypt.hash(CreateOrganizationDto.password, 8),
    };

    const createdOrganization = await this.prisma.organization
      .create({ data, select: this.organizationSelect })
      .catch(handleError);
    return { ...createdOrganization };
  }

  // Update Organization
  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    await this.findOne(id);
    const data: any = { ...updateOrganizationDto };
    return this.prisma.organization.update({ data, where: { id } });
  }

  // Remove Organization
  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.organization.delete({ where: { id } });
    return `Registro da Organização com o ID:${id} deletado com sucesso`;
  }
}
