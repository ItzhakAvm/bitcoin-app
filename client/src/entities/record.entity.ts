import { Currency, Rate } from '../types/crypto';
import { formatToDate } from '../utils/date';
import { Transform } from 'class-transformer';

export class Record {
  id: number;

  @Transform(formatToDate, { toClassOnly: true })
  date: Date;

  rate: Rate;

  currency: Currency;

  price: number;

  created_at: Date;
}
