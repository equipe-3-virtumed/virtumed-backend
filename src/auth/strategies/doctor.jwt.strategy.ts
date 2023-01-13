import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt} from 'passport-jwt';
import { Strategy } from 'passport-local';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorStrategy extends PassportStrategy(Strategy, 'Doctor') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string; userRole: string }) {
    let user = null;

    if (payload.userRole === 'doctor') {
      user = await this.prisma.doctor.findUniqueOrThrow({
        where: { email: payload.email },
      });
    }

    if (user) {
      delete user.password;
      return user;
    }
  }
}