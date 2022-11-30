import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtDoctorStrategy extends PassportStrategy(Strategy, 'doctorJwt') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string }) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { email: payload.email },
    });

    if (!doctor) {
      throw new UnauthorizedException(
        'User does not exist or is not authenticated',
      );
    }
    delete doctor.password;

    return doctor;
  }
}