import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { UserModule } from './user/user.module';
import { CryptoModule } from './crypto/crypto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Portfolio } from './portfolio/portfolio.entity';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
      })],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Portfolio],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    PortfolioModule,
    UserModule,
    CryptoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
