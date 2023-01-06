import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin, Doctor, Organization, Patient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { create } from 'domain';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { Module } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService     
  ) {}

  
  async Login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Checks if the user record exists, using email to check
    let user = null
    const userSelect = []
    
    user = await this.prisma.patient.findUnique({ where: { email } });
    if (user != null) userSelect.push(user);

    user = await this.prisma.organization.findUnique({ where: { email } });
    if (user != null) userSelect.push(user);

    user = await this.prisma.doctor.findUnique({ where: { email } });
    if (user != null) userSelect.push(user);

    user = await this.prisma.admin.findUnique({ where: { email } });
    if (user != null) userSelect.push(user);
    
  


    console.log(userSelect);
    if (!userSelect) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    // check if the login information is corret
    const isHashValid = await bcrypt.compare(password, userSelect[0].password);

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    delete userSelect[0].password;

    return {
      token: this.jwtService.sign({ email }),
      client: { ...userSelect[0] },
    };
  }
}
