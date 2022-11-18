import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: 'Fazer Login, recebendo um token de autenticação',
  })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retorna usuário autenticado no momento',
  })
  profile(user: any) {
    return user;
  }

}
