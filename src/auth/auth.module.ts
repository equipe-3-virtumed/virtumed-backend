import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from 'src/admin/admin.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './admin-auth.controller';
import { AuthService } from './admin-auth.service';
import { JwtAdminStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'adminJwt' }),
    AdminModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAdminStrategy],
})
export class AuthModule {}
