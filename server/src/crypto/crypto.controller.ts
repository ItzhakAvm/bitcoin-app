import { Controller, Get, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { GetByDateDto } from './dto/get-by-date.dto';
import { RecordResponse } from '../types/crypto';

@Controller('crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {}

  @Get('byDate')
  getByDate(
    @Query() getByDateDto: GetByDateDto,
  ): Promise<RecordResponse> {
    return this.cryptoService.getByDate(getByDateDto, true);
  }

  @Get('fetch')
  fetchRemote(): Promise<boolean> {
    return this.cryptoService.fetch();
  }
}
