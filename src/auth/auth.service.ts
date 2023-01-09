import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async Login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    let user = null;

    if (!user)
      user = await this.prisma.patient.findUnique({ where: { email } });

    if (!user)
      user = await this.prisma.organization.findUnique({ where: { email } });

    if (!user)
      user = await this.prisma.doctor.findUnique({ where: { email } });

    if (!user)
      user = await this.prisma.admin.findUnique({ where: { email } });

    if (user) {
      const isHashValid = await bcrypt.compare(password, user.password);

      if (!isHashValid) {
        throw new UnauthorizedException('Invalid user and/or password PASS');
      }

      delete user.password;

      const userRole = user.role;

      return {
        token: this.jwtService.sign({ email, userRole }),
        user: { ...user },
      };
    }

    throw new UnauthorizedException('Invalid user and/or password');
  }
}
