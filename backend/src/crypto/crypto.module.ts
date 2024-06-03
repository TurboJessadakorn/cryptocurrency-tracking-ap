import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';

@Module({
  imports: [HttpModule],
  providers: [CryptoService],
  controllers: [CryptoController],
})
export class CryptoModule {}