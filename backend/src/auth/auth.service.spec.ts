import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return access token if credentials are valid', async () => {
      const username = 'testuser';
      const password = 'password123';
      const user = { id: 1, username } as any;
      const token = 'generated-token';

      jest.spyOn(userService, 'validateUser').mockResolvedValueOnce(user);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(token);

      const result = await service.login(username, password);

      expect(result).toEqual({ access_token: token });
      expect(userService.validateUser).toHaveBeenCalledWith(username, password);
      expect(jwtService.sign).toHaveBeenCalledWith({ username, sub: user.id });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const username = 'testuser';
      const password = 'password123';

      jest.spyOn(userService, 'validateUser').mockResolvedValueOnce(null);

      await expect(service.login(username, password)).rejects.toThrowError(UnauthorizedException);
      expect(userService.validateUser).toHaveBeenCalledWith(username, password);
    });
  });
});
