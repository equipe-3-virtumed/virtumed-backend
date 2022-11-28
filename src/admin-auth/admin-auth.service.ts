import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from '../utils/dto/login-response.dto';
import { LoginDto } from '../utils/dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly prime: PrismaService,
    private readonly jwtService:JwtService,
  ) {}
  async adminLogin(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Checks if the admin record exists, using email to check
    const admin = await this.prime.admin.findUnique ( {where: { email }})

    if (!admin) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    // check if the login information is corret
    const isHashValid = await bcrypt.compare(password, admin.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    delete admin.password;

    return {
      token: this.jwtService.sign({ email }),
      client: { ...admin},
    };
  }
}
