import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'adminJwt') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string }) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: payload.email },
    });

    if (!admin) {
      throw new UnauthorizedException(
        'User does not exist or is not authenticated',
      );
    }
    delete admin.password;

    return admin;
  }
}