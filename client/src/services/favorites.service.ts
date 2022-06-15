import { client } from './';
import { Favorite } from '../entities/favorite.entity';
import { plainToInstance } from 'class-transformer';
import { dateToFormat } from '../utils/date';

export const addFavorite = (date: Date): Promise<Favorite> => {
  return client
    .post<Favorite>(
      '/favorites',
      {},
      { params: { date: dateToFormat({ value: date }) } },
    )
    .then((res) => plainToInstance(Favorite, res.data));
};

export const removeFavorite = (date: Date): Promise<boolean> => {
  return client
    .delete<string>('/favorites', {
      params: { date: dateToFormat({ value: date }) },
    })
    .then((res) => res.data === 'true');
};

export const getFavorites = (): Promise<Favorite[]> => {
  return client
    .get<Favorite[]>('/favorites')
    .then((res) => plainToInstance(Favorite, res.data));
};
