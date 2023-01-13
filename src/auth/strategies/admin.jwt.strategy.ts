import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'Admin') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string; userRole: string }) {
    let user = null;

    if (payload.userRole === 'admin') {
      user = await this.prisma.admin.findUniqueOrThrow({
        where: { email: payload.email },
      });
    }

    if (user) {
      delete user.password;
      return user;
    }
  }
}
