import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from 'src/admin/admin.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { OrganizationModule } from 'src/organization/organization.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'Jwt' }),
    AdminModule,
    OrganizationModule,
    DoctorModule,
    PatientModule,     
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy]
})
export class AuthModule {}
