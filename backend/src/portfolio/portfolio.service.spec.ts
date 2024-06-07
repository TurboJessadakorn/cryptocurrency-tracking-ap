import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from './portfolio.entity';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let repository: Repository<Portfolio>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: getRepositoryToken(Portfolio),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
    repository = module.get<Repository<Portfolio>>(
      getRepositoryToken(Portfolio),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new portfolio', async () => {
      const user = new User();
      const cryptocurrency = 'Bitcoin';
      const logo = 'bitcoin.png';
      const symbol = 'BTC';
      const amount = 1;
      const purchasePrice = 40000;

      const saveSpy = jest.spyOn(repository, 'save').mockResolvedValueOnce({
        id: 1,
        user,
        cryptocurrency,
        logo,
        symbol,
        amount,
        purchasePrice,
      } as any);

      const result = await service.create(
        user,
        cryptocurrency,
        logo,
        symbol,
        amount,
        purchasePrice,
      );

      expect(saveSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          user,
          cryptocurrency,
          logo,
          symbol,
          amount,
          purchasePrice,
        }),
      );
      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          user,
          cryptocurrency,
          logo,
          symbol,
          amount,
          purchasePrice,
        }),
      );
    });
  });

  describe('findByUser', () => {
    it('should return portfolios of the given user', async () => {
      const user: User = { id: 1 } as any;
      const expectedPortfolios: Portfolio[] = [
        {
          id: 1,
          user,
          cryptocurrency: 'Bitcoin',
          amount: 1,
          purchasePrice: 40000,
          logo: '',
          symbol: '',
          createdAt: undefined,
          updatedAt: undefined,
        },
        {
          id: 2,
          user,
          cryptocurrency: 'Ethereum',
          amount: 2,
          purchasePrice: 2000,
          logo: '',
          symbol: '',
          createdAt: undefined,
          updatedAt: undefined,
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValueOnce(expectedPortfolios);

      const result = await service.findByUser(user);

      expect(result).toEqual(expectedPortfolios);
      expect(repository.find).toHaveBeenCalledWith({ where: { user } });
    });

    it('should return an empty array if user has no portfolios', async () => {
      const user: User = { id: 1 } as any;
      const expectedPortfolios: Portfolio[] = [];

      jest.spyOn(repository, 'find').mockResolvedValueOnce(expectedPortfolios);

      const result = await service.findByUser(user);

      expect(result).toEqual(expectedPortfolios);
      expect(repository.find).toHaveBeenCalledWith({ where: { user } });
    });
  });
});
