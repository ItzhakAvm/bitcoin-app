import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getFavorites } from '../../services/favorites.service';
import { Favorite } from '../../entities/favorite.entity';
import { FavoriteItem } from './FavoriteItem';

const FavoriteList = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    getFavorites().then(setFavorites);
  }, []);

  return (
    <>
      <Typography variant="h4">Favorite dates</Typography>
      {favorites.map((favorite) => (
        <FavoriteItem key={favorite.date.toISOString()} favorite={favorite} />
      ))}
    </>
  );
};

export default FavoriteList;
