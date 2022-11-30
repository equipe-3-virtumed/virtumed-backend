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
import { AuthService } from './organization-auth.service';
import { LoginResponseDto } from '../utils/dto/login-response.dto';
import { LoginDto } from '../utils/dto/login.dto';
import { LoggedUser } from './logged-admin.decorator';

@ApiTags('AdminAuth')
@Controller('AdminAuth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving an authentication token',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
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
