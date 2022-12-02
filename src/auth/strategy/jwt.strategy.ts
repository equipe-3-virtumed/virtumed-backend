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

@Injectable()
export class JwtOrganizationStrategy extends PassportStrategy(Strategy, 'organizationJwt') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string }) {
    const organization = await this.prisma.organization.findUnique({
      where: { email: payload.email },
    });

    if (!organization) {
      throw new UnauthorizedException(
        'User does not exist or is not authenticated',
      );
    }
    delete organization.password;

    return organization;
  }
}

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

@Injectable()
export class JwtPatientStrategy extends PassportStrategy(Strategy, 'patientJwt') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string }) {
    const patient = await this.prisma.patient.findUnique({
      where: { email: payload.email },
    });

    if (!patient) {
      throw new UnauthorizedException(
        'User does not exist or is not authenticated',
      );
    }
    delete patient.password;

    return patient;
  }
}