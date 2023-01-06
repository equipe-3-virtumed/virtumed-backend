import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'Jwt') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string }) {
    let user = null;
    const userSelect = [];

    user = await this.prisma.patient.findUnique({
      where: { email: payload.email },
    });
    if (user != null) userSelect.push(user);

    user = await this.prisma.organization.findUnique({
      where: { email: payload.email },
    });
    if (user != null) userSelect.push(user);

    user = await this.prisma.doctor.findUnique({
      where: { email: payload.email },
    });
    if (user != null) userSelect.push(user);

    user = await this.prisma.admin.findUnique({
      where: { email: payload.email },
    });
    if (user != null) userSelect.push(user);

    if (!userSelect) {
      throw new UnauthorizedException(
        'User does not exist or is not authenticated',
      );
    }
    delete userSelect[0].password;

    return userSelect[0];
  }
}
