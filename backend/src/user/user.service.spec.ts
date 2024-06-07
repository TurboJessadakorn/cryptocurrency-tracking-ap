import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcryptjs';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'password123',
      };

      const expectedHashedPassword = '$2a$10$6avsA7aM8NGOPBIB2Sulf.rPY1oXfJ6dWU0beL484s2cnRuP5TqBe'; // Replace with the expected hash

      // Mock the `create` method of the repository
      const createSpy = jest.spyOn(repository, 'create').mockImplementation((userData) => ({
        id: 1,
        username: userData.username,
        password: expectedHashedPassword,
        portfolios: []
      }));

      // Mock the `save` method of the repository
      const saveSpy = jest.spyOn(repository, 'save').mockResolvedValueOnce({
        id: 1,
        username: createUserDto.username,
        password: expectedHashedPassword,
        portfolios: []
      });

      const result = await service.create(createUserDto);

      expect(createSpy).toHaveBeenCalledWith(expect.objectContaining({
        username: createUserDto.username,
        password: expect.any(String),
      }));
      expect(saveSpy).toHaveBeenCalledWith(expect.objectContaining({
        username: createUserDto.username,
        password: expectedHashedPassword,
      }));
      expect(result).toEqual(expect.objectContaining({
        id: expect.any(Number),
        username: createUserDto.username,
        password: expectedHashedPassword,
      }));
    });
  });

  describe('findOne', () => {
    it('should find a user by username', async () => {
      const username = 'testuser';
      const user = { id: 1, username, password: 'password123' } as any;

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(user);

      const result = await service.findOne(username);

      expect(result).toEqual(user);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { username } });
    });

    it('should return undefined if user does not exist', async () => {
      const username = 'nonexistentuser';

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      const result = await service.findOne(username);

      expect(result).toBeUndefined();
      expect(repository.findOne).toHaveBeenCalledWith({ where: { username } });
    });
  });

  describe('findById', () => {
    it('should find a user by id', async () => {
      const id = 1;
      const user = { id, username: 'testuser', password: 'password123' } as any;

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(user);

      const result = await service.findById(id);

      expect(result).toEqual(user);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return undefined if user does not exist', async () => {
      const id = 999;

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      const result = await service.findById(id);

      expect(result).toBeUndefined();
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('validateUser', () => {
    it('should return user if username and password are correct', async () => {
      const username = 'testuser';
      const password = 'password123';
      const hashedPassword = '$2a$10$6avsA7aM8NGOPBIB2Sulf.rPY1oXfJ6dWU0beL484s2cnRuP5TqBe';
      const user = { id: 1, username, password: hashedPassword } as any;

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(await Promise.resolve(true as never));

      // Call the validateUser function
      const result = await service.validateUser(username, password);

      expect(result).toEqual({ id: user.id, username: user.username });
      expect(service.findOne).toHaveBeenCalledWith(username);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
    });

    it('should return null if user does not exist', async () => {
      const username = 'nonexistentuser';
      const password = 'password123';
    
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(undefined);
    
      const result = await service.validateUser(username, password);
    
      expect(result).toBeNull();
      expect(service.findOne).toHaveBeenCalledWith(username);
    });


    it('should return null if password is incorrect', async () => {
      const username = 'testuser';
      const password = 'incorrectpassword';
      const hashedPassword = '$2a$10$6avsA7aM8NGOPBIB2Sulf.rPY1oXfJ6dWU0beL484s2cnRuP5TqBe';
      const user = { id: 1, username, password: hashedPassword } as any;

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(await Promise.resolve(false as never));

      // Call the validateUser function
      const result = await service.validateUser(username, password);

      expect(result).toBeNull();
      expect(service.findOne).toHaveBeenCalledWith(username);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
    });
  });
});
