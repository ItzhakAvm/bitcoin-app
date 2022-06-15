import { client } from './index';
import { dateToFormat } from '../utils/date';
import { RecordResponse } from '../types/crypto';

export const getByDate = (date: Date): Promise<RecordResponse> => {
  return client
    .get('/crypto/byDate', {
      params: { date: dateToFormat({ value: date }) },
    })
    .then((res) => res.data);
};

export const refetchData = (): Promise<boolean> => {
  return client.get('/crypto/fetch').then((res) => res.data === 'true');
};
