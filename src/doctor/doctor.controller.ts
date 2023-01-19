import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@ApiTags('Doctor')
@ApiBearerAuth()
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @UseGuards(AuthGuard(['Admin', 'Organization']))
  @ApiOperation({
    summary: 'Create Doctor - Admin / Organization Auth',
  })
  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const register = await this.doctorService.create(createDoctorDto);
    return { ...register };
  }

  @UseGuards(AuthGuard('Global'))
  @ApiOperation({
    summary: 'View all Doctor`s - Global Auth',
  })
  @Get()
  async findAll(): Promise<Doctor[]> {
    return await this.doctorService.findAll();
  }

  @UseGuards(AuthGuard('Global'))
  @ApiOperation({
    summary: 'View Doctor by id - Global Auth',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Doctor> {
    return await this.doctorService.findOne(id);
  }

  @UseGuards(AuthGuard(['Admin', 'Organization']))
  @ApiOperation({
    summary: 'Edit Doctor by id - Admin / Organization Auth',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorService.update(id, updateDoctorDto);
  }

  @UseGuards(AuthGuard(['Admin', 'Organization']))
  @ApiOperation({
    summary: 'Delete Doctor by id - Admin / Organization Auth',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.doctorService.remove(id);
  }
}
