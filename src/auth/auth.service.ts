import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly prime: PrismaService,
    private readonly jwtService:JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Checks if the admin record exists, using email to check
    const admin = await this.prime.admin.findUnique ( {where: { email }})

    if (!admin) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    // check if the login information is corret
    const isHashValid = await bcrypt.compare(password, admin.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    delete admin.password;

    return {
      token: this.jwtService.sign({ email }),
      admin,
    };
  }
}
