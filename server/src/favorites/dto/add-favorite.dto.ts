import { IsDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { formatToDate } from '../../utils/date';

export class AddFavoriteDto {
  @Transform(formatToDate, { toClassOnly: true })
  @IsDate()
  date: Date;
}
