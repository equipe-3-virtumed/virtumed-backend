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
import { AuthAdminService, AuthOrganizationService  } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoggedUser } from '../utils/logged.decorator';

@ApiTags('AdminAuth')
@Controller('AdminAuth')
export class AuthAdminController {
  constructor(private readonly authService: AuthAdminService) {}

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

@ApiTags('OrganizationAuth')
@Controller('OrganizationAuth')
export class AuthOrganizationController {
  constructor(private readonly authService: AuthOrganizationService) {}

  @Post('login')  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in, receiving an authentication token',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.organizationLogin(loginDto);
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

