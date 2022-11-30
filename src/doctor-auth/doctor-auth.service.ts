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
  async doctorLogin(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Checks if the Doctor record exists, using email to check
    const doctor = await this.prime.doctor.findUnique ( {where: { email }})

    if (!doctor) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    // check if the login information is corret
    const isHashValid = await bcrypt.compare(password, doctor.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    delete doctor.password;

    return {
      token: this.jwtService.sign({ email }),
      client: { ...doctor},
    };
  }
}
