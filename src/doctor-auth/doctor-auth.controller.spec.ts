import { Test, TestingModule } from '@nestjs/testing';
import { describe, it } from 'node:test';
import { AuthController } from './doctor-auth.controller';
import { AuthService } from './doctor-auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
