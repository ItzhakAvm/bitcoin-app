import { Module } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsRepository } from './records.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecordsRepository])],
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class CryptoModule {}
