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

    const userSelect = (this.prisma.admin)
    const user = await userSelect.findUnique({
      where: { email: payload.email },
    });
   
    if (!user) {
      throw new UnauthorizedException(
        'User does not exist or is not authenticated',
      );
    }
    delete user.password;

    
    return user
  }
}
