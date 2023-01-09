import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GlobalStrategy extends PassportStrategy(Strategy, 'Global') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string; userRole: string }) {
    console.log(
      '🚀 ~ file: global.jwt.strategy.ts:17 ~ GlobalStrategy ~ validate ~ payload',
      payload,
    );
    let user = null;

    if (payload.userRole === 'patient') {
      user = await this.prisma.patient.findUniqueOrThrow({
        where: { email: payload.email },
      });
    }

    if (payload.userRole === 'organization') {
      user = await this.prisma.organization.findUniqueOrThrow({
        where: { email: payload.email },
      });
    }

    if (payload.userRole === 'doctor') {
      user = await this.prisma.doctor.findUniqueOrThrow({
        where: { email: payload.email },
      });
    }

    if (payload.userRole === 'admin') {
      user = await this.prisma.admin.findUniqueOrThrow({
        where: { email: payload.email },
      });
    }

    if (user) {
      delete user.password;
      return user;
    }

    throw new UnauthorizedException('Invalid user and/or password');

    // console.log("🚀 ~ file: global.jwt.strategy.ts:49 ~ GlobalStrategy ~ validate ~ userSelect[0]", userSelect[0])
  }
}
