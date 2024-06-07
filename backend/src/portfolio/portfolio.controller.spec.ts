import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { UserService } from '../user/user.service';
import { CreatePortfolioDto } from './portfolio.dto';
import { User } from '../user/user.entity';

describe('PortfolioController', () => {
  let controller: PortfolioController;
  let portfolioService: PortfolioService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [
        {
          provide: PortfolioService,
          useValue: {
            create: jest.fn(),
            findByUser: jest.fn(),
            findHistory: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PortfolioController>(PortfolioController);
    portfolioService = module.get<PortfolioService>(PortfolioService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new portfolio', async () => {
      const user: User = { id: 1 } as any;
      const createPortfolioDto: CreatePortfolioDto = {
        cryptocurrency: 'Bitcoin',
        logo: 'bitcoin.png',
        symbol: 'BTC',
        amount: 1,
        purchasePrice: 40000,
      };

      jest.spyOn(userService, 'findById').mockResolvedValueOnce(user);
      jest.spyOn(portfolioService, 'create').mockResolvedValueOnce(createPortfolioDto as any);

      const result = await controller.create({ user: { sub: user.id } }, createPortfolioDto);

      expect(result).toEqual(createPortfolioDto);
      expect(portfolioService.create).toHaveBeenCalledWith(user, createPortfolioDto.cryptocurrency, createPortfolioDto.logo, createPortfolioDto.symbol, createPortfolioDto.amount, createPortfolioDto.purchasePrice);
    });
  });
});
