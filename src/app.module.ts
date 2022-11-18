import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { AdminModule } from './admin/admin.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [OrganizationModule, AdminModule, DoctorModule, PatientModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
