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
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Patient } from './entities/patient.entity';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiOperation({
    summary: 'Create Patient',
  })
  @Post()
  async create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    const register = await this.patientService.create(createPatientDto);
    return { ...register };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard(['Admin', 'Organization']))
  @ApiOperation({
    summary: 'View all Patient`s - Admin / Organization Auth',
  })
  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('Global'))
  @ApiOperation({
    summary: 'View Patient by id - Global Auth',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('Global'))
  @ApiOperation({
    summary: 'Edit Patient by id - Global Auth',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('Global'))
  @ApiOperation({
    summary: 'Delete Patient by id - Global Auth',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
