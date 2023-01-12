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
import { AuthService  } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoggedUser } from './strategies/logged.decorator';
import { Organization } from 'src/organization/entities/organization.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving an authentication token',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.Login(loginDto);
  }

  @Get('auth')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Returns the currently authenticated user',
  })
  @ApiBearerAuth()
  profile(@LoggedUser() user: Admin | Doctor | Organization | Patient ) {
    return user;
  }
}
