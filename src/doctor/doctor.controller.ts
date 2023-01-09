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
@UseGuards(AuthGuard('Global'))
@ApiBearerAuth()
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({
    summary: 'Create Doctor',
  })
  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    const register = await this.doctorService.create(createDoctorDto)
    return {...register}
  }

  @ApiOperation({
    summary: 'View all Doctor`s',
  })
  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @ApiOperation({
    summary: 'View Doctor by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Doctor> {
    return this.doctorService.findOne(id);
  }

  @ApiOperation({
    summary: 'Edit Doctor by id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @ApiOperation({
    summary: 'Delete Doctor by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}
