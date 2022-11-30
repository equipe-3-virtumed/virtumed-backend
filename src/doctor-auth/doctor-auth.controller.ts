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
import { AuthService } from './doctor-auth.service';
import { LoginResponseDto } from '../utils/dto/login-response.dto';
import { LoginDto } from '../utils/dto/login.dto';
import { LoggedUser } from './logged-company.decorator';
import { Doctor } from '@prisma/client';

@ApiTags('DoctorAuth')
@Controller('DoctorAuth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving an authentication token',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.doctorLogin(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Returns the currently authenticated doctor',
  })
  @ApiBearerAuth()
  profile(@LoggedUser() doctor: Doctor) {
    return { doctor };
  }
}
