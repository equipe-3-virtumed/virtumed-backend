import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({
    summary: "Create Doctor",
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @ApiOperation({
    summary: 'View all Doctor`s'
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @ApiOperation({
    summary: 'View Doctor by id'
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @ApiOperation({
    summary: 'Edit Doctor by id',
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @ApiOperation({
    summary: 'Delete Doctor by id',
  })
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}
