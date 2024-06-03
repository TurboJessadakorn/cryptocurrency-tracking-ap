import { Controller, Get } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('top')
  async getTopCryptos() {
    return this.cryptoService.getTopCryptos();
  }
}
