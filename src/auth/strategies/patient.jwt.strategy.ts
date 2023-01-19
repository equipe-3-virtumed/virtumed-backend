import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from "passport-local";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientStrategy extends PassportStrategy(Strategy, 'Patient') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string; userRole: string }) {
    let user = null;

    if (payload.userRole === 'patient') {
      user = await this.prisma.patient.findUniqueOrThrow({
        where: { email: payload.email },
      });
    }

    if (user) {
      delete user.password;
      return user;
    }
  }
}