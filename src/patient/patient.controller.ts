import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiOperation({
    summary: "Create Patient",
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @ApiOperation({
    summary: 'View all Patient`s'
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @ApiOperation({
    summary: 'View Patient by id'
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @ApiOperation({
    summary: 'Edit Patient by id',
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @ApiOperation({
    summary: 'Delete Patient by id',
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
