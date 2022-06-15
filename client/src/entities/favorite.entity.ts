import { formatToDate } from '../utils/date';
import { Transform } from 'class-transformer';

export class Favorite {
  id: number;

  @Transform(formatToDate, { toClassOnly: true })
  date: Date;

  @Transform(formatToDate, { toClassOnly: true })
  created_at: Date;
}
