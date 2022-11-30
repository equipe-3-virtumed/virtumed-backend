import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './doctor-auth.controller';
import { AuthService } from './doctor-auth.service';
import { JwtDoctorStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'doctorJwt' }),
    DoctorModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtDoctorStrategy],
})
export class AuthModule {}
