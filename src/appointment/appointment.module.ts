import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GetTokenService } from "./get.token.service";

@Module({
  imports: [PrismaModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, GetTokenService],
})
export class AppointmentModule {}
