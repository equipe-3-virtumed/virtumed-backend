/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@ApiTags('Admin')
@UseGuards(AuthGuard('Admin'))
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({
    summary: 'Create Admin',
  })
  @Post()
  async create(@Body() data: CreateAdminDto): Promise<Admin> {
    const register = await this.adminService.create(data);
    return { ...register };
  }

  @ApiOperation({
    summary: 'View all Admin`s',
  })
  @Get()
  async findAll(): Promise<Admin[]> {
    return await this.adminService.findAll();
  }

  @ApiOperation({
    summary: 'View Admin by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Admin> {
    return await this.adminService.findOne(id);
  }

  @ApiOperation({
    summary: 'Edit Admin by id',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return await this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({
    summary: 'Delete Admin by id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.adminService.remove(id);
  }
}
