import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from 'src/admin/admin.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import {
  AuthAdminController,
  AuthDoctorController,
  AuthOrganizationController,
  AuthPatientController,
} from './auth.controller';
import { AuthAdminService, AuthDoctorService, AuthOrganizationService, AuthPatientService } from './auth.service';
import {
  JwtAdminStrategy,
  JwtDoctorStrategy,
  JwtOrganizationStrategy,
  JwtPatientStrategy,
} from '../auth/strategy/jwt.strategy';
import { OrganizationModule } from 'src/organization/organization.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'adminJwt' }),
    AdminModule,
    OrganizationModule,
    DoctorModule,
    PatientModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [
    AuthAdminController,
    AuthOrganizationController,
    AuthDoctorController,
    AuthPatientController,
  ],
  providers: [
    AuthAdminService,
    AuthOrganizationService,
    AuthDoctorService,
    AuthPatientService,
    JwtAdminStrategy,
    JwtOrganizationStrategy,
    JwtDoctorStrategy,
    JwtPatientStrategy
  ],
})
export class AuthModule {}
