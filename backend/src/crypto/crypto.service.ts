import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

export interface Crypto {
  id: number;
  name: string;
  symbol: string;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  cmc_rank: number;
  last_updated: string;
  quote: {
    THB: {
      price: number;
    }
  };
  logo: string;
}

export interface CryptoResponse {
  data: Crypto[];
}

@Injectable()
export class CryptoService {
  private readonly apiKey = process.env.COINMARKETCAP_API_KEY;
  private readonly baseUrl = 'https://pro-api.coinmarketcap.com/v1';

  constructor(private readonly httpService: HttpService) {}

  async getTopCryptos(): Promise<Crypto[]> {
    const url = `${this.baseUrl}/cryptocurrency/listings/latest`;
    const headers = { 'X-CMC_PRO_API_KEY': this.apiKey };
    const params = { convert: 'THB', limit: 100 };

    const cryptos: Crypto[] = await this.httpService.get(url, { headers, params })
      .pipe(map((response: AxiosResponse<CryptoResponse>) => response.data.data))
      .toPromise();

    // Fetch logos for each crypto
    const ids = cryptos.map(crypto => crypto.id).join(',');
    const logoData = await this.getCryptoLogos(ids);

    // Map logos to cryptos
    return cryptos.map(crypto => ({
      ...crypto,
      logo: logoData[crypto.id]?.logo || null,
    }));
  }

  private async getCryptoLogos(ids: string): Promise<Record<number, { logo: string }>> {
    const url = `${this.baseUrl}/cryptocurrency/info`;
    const headers = { 'X-CMC_PRO_API_KEY': this.apiKey };
    const params = { id: ids };

    const response = await this.httpService.get(url, { headers, params })
      .pipe(map((response: AxiosResponse<{ data: Record<string, { logo: string }> }>) => response.data.data))
      .toPromise();

    const logoData: Record<number, { logo: string }> = {};
    for (const id in response) {
      logoData[+id] = { logo: response[id].logo };
    }
    return logoData;
  }
}
