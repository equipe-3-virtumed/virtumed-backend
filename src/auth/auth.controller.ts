import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/admin/entities/admin.entity';
import { AuthAdminService, AuthDoctorService, AuthOrganizationService, AuthPatientService  } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginAdminDto, LoginOrganizationDto, LoginDoctorDto, LoginPatientDto } from './dto/login.dto';
import { LoggedUser } from '../utils/logged.decorator';
import { Organization } from 'src/organization/entities/organization.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';

@ApiTags('AdminAuth')
@Controller('AdminAuth')
export class AuthAdminController {
  constructor(private readonly authService: AuthAdminService) {}

  @Post('login')  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving an authentication token',
  })
  login(@Body() loginDto: LoginAdminDto): Promise<LoginResponseDto> {
    return this.authService.adminLogin(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Returns the currently authenticated user',
  })
  @ApiBearerAuth()
  profile(@LoggedUser() admin: Admin) {
    return admin;
  }
}

@ApiTags('OrganizationAuth')
@Controller('OrganizationAuth')
export class AuthOrganizationController {
  constructor(private readonly authService: AuthOrganizationService) {}

  @Post('login')  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving an authentication token',
  })
  login(@Body() loginDto: LoginOrganizationDto): Promise<LoginResponseDto> {
    return this.authService.organizationLogin(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Returns the currently authenticated user',
  })
  @ApiBearerAuth()
  profile(@LoggedUser() Organization: Organization) {
    return Organization;
  }
}

@ApiTags('DoctorAuth')
@Controller('DoctorAuth')
export class AuthDoctorController {
  constructor(private readonly authService: AuthDoctorService) {}

  @Post('login')  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving an authentication token',
  })
  login(@Body() loginDto: LoginDoctorDto): Promise<LoginResponseDto> {
    return this.authService.doctorLogin(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Returns the currently authenticated user',
  })
  @ApiBearerAuth()
  profile(@LoggedUser() Doctor: Doctor) {
    return Doctor;
  }
}

@ApiTags('PatientAuth')
@Controller('PatientAuth')
export class AuthPatientController {
  constructor(private readonly authService: AuthPatientService) {}

  @Post('login')  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving an authentication token',
  })
  login(@Body() loginDto: LoginPatientDto): Promise<LoginResponseDto> {
    return this.authService.patientLogin(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Returns the currently authenticated user',
  })
  @ApiBearerAuth()
  profile(@LoggedUser() Patient: Patient) {
    return Patient;
  }
}

