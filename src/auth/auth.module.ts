import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminStrategy } from './strategies/admin.jwt.strategy';
import { DoctorStrategy } from './strategies/doctor.jwt.strategy';
import { GlobalStrategy } from './strategies/global.jwt.strategy';
import { OrganizationStrategy } from './strategies/organization.jwt.strategy';
import { PatientStrategy } from "./strategies/patient.jwt.strategy";

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'Global' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GlobalStrategy,
    AdminStrategy,
    OrganizationStrategy,
    DoctorStrategy,
    PatientStrategy
  ],
})
export class AuthModule {}
