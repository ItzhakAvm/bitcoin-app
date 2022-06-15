import { Record } from '../crypto/entities/record.entity';

export enum Currency {
  USD = 'USD',
  ILS = 'ILS',
}

export enum Rate {
  OPEN = 'open',
  HIGH = 'high',
  LOW = 'low',
  CLOSE = 'close',
}

type RecordListWithFavoriteIndicator = {
  isFavorite: boolean;
  records: Record[];
};

export type RecordQueryResult<T> = T extends true
  ? RecordListWithFavoriteIndicator
  : T extends false
  ? Record[]
  : never;

export type RecordResponse = RecordListWithFavoriteIndicator;
