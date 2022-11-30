import { Test, TestingModule } from '@nestjs/testing';
import { describe, it } from 'node:test';
import { AuthController } from './organization-auth.controller';
import { AuthService } from './organization-auth.service';

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
