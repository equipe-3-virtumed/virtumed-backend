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
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/strategies/logged.decorator';
import { Doctor, Organization, Patient, Appointment } from '@prisma/client';

@ApiTags('Appointment')
@ApiBearerAuth()
@UseGuards(AuthGuard(['Global']))
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(
    @Body() data: CreateAppointmentDto,
    @LoggedUser() user: Organization | Doctor | Patient,
  ): Promise<Appointment> {
    return await this.appointmentService.create(data, user);
  }

  @Get()
  async findAll(
    @LoggedUser() user: Organization | Doctor | Patient,
  ): Promise<Appointment[] | Appointment | string> {
    return await this.appointmentService.findAll(user);
  }

  @Get(':appointmentId')
  async findOne(
    @Param('appointmentId') appointmentId: string,
    @LoggedUser() user: Organization | Doctor | Patient,
  ): Promise<Appointment> {
    return await this.appointmentService.findOne(appointmentId, user);
  }

  @UseGuards(AuthGuard(['Patient', 'Doctor']))
  @Get('connect/:appointmentId')
  async connect(
    @Param('appointmentId') appointmentId: string,
    @LoggedUser() user: Patient | Doctor,
  ) {
    return await this.appointmentService.connect(appointmentId, user);
  }

  @UseGuards(AuthGuard(['Patient', 'Doctor', 'Organization']))
  @Patch(':appointmentId')
  async update(
    @Param('appointmentId') appointmentId: string,
    @LoggedUser() user: Organization | Doctor | Patient,
    @Body() updateAppointment: UpdateAppointmentDto,
  ) {
    return await this.appointmentService.update(
      appointmentId,
      user,
      updateAppointment,
    );
  }

  @Delete(':appointmentId')
  async remove(@Param('appointmentId') appointmentId: string) {
    return await this.appointmentService.remove(appointmentId);
  }
}
