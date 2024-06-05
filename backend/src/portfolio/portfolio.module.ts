import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { Portfolio } from './portfolio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Portfolio])
  ],
  providers: [PortfolioService],
  controllers: [PortfolioController]
})
export class PortfolioModule {}
