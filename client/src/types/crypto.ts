import { Record } from '../entities/record.entity';

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

export type RecordResponse = {
  isFavorite: boolean;
  records: Record[];
};

export type RecordByCurrency = {
  [currency in Currency]?: Record[];
};
