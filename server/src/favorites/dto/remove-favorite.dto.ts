import { IsDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { formatToDate } from '../../utils/date';

export class RemoveFavoriteDto {
  @IsDate()
  @Transform(formatToDate, { toClassOnly: true })
  date: Date;
}
