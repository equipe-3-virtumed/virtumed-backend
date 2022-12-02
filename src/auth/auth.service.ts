import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginAdminDto, LoginOrganizationDto, LoginDoctorDto, LoginPatientDto } from './dto/login.dto';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly prime: PrismaService,
    private readonly jwtService:JwtService,
  ) {}
  async adminLogin(loginDto: LoginAdminDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Checks if the admin record exists, using email to check
    const admin = await this.prime.admin.findUnique ( {where: { email }})

    if (!admin) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    // check if the login information is corret
    const isHashValid = await bcrypt.compare(password, admin.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    delete admin.password;

    return {
      token: this.jwtService.sign({ email }),
      client: { ...admin},
    };
  }
}
@Injectable()
export class AuthOrganizationService {
  constructor(
    private readonly prime: PrismaService,
    private readonly jwtService:JwtService,
  ) {}
  async organizationLogin(loginDto: LoginOrganizationDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Checks if the organization record exists, using email to check
    const organization = await this.prime.organization.findUnique ( {where: { email }})

    if (!organization) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    // check if the login information is corret
    const isHashValid = await bcrypt.compare(password, organization.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    delete organization.password;

    return {
      token: this.jwtService.sign({ email }),
      client: { ...organization},
    };
  }
}
@Injectable()
export class AuthDoctorService {
  constructor(
    private readonly prime: PrismaService,
    private readonly jwtService:JwtService,
  ) {}
  async doctorLogin(loginDto: LoginDoctorDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Checks if the doctor record exists, using email to check
    const doctor = await this.prime.doctor.findUnique ( {where: { email }})

    if (!doctor) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    // check if the login information is corret
    const isHashValid = await bcrypt.compare(password, doctor.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    delete doctor.password;

    return {
      token: this.jwtService.sign({ email }),
      client: { ...doctor},
    };
  }
}

@Injectable()
export class AuthPatientService {
  constructor(
    private readonly prime: PrismaService,
    private readonly jwtService:JwtService,
  ) {}
  async patientLogin(loginDto: LoginPatientDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Checks if the patient record exists, using email to check
    const patient = await this.prime.patient.findUnique ( {where: { email }})

    if (!patient) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    // check if the login information is corret
    const isHashValid = await bcrypt.compare(password, patient.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid user and/or password');
    }

    delete patient.password;

    return {
      token: this.jwtService.sign({ email }),
      client: { ...patient},
    };
  }
}