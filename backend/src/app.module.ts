import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortfolioModule } from './portfolio/portfolio.module';
import { CryptoModule } from './crypto/crypto.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PortfolioModule, CryptoModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
