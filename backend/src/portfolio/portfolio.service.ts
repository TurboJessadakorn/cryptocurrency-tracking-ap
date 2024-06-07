import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './portfolio.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(user: User, cryptocurrency: string, logo: string, symbol: string, amount: number, purchasePrice: number): Promise<Portfolio> {
    const portfolio = new Portfolio();
    portfolio.user = user;
    portfolio.cryptocurrency = cryptocurrency;
    portfolio.logo = logo;
    portfolio.symbol = symbol;
    portfolio.amount = amount;
    portfolio.purchasePrice = purchasePrice;
    return this.portfolioRepository.save(portfolio);
  }

  async findByUser(user: User): Promise<Portfolio[]> {
    return this.portfolioRepository.find({ where: { user } });
  }

  async findHistory(user: User): Promise<Portfolio[]> {
    return this.portfolioRepository.find({ where: { user }, order: { createdAt: 'DESC' } });
  }
}