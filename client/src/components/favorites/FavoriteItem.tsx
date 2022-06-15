import { Button, Paper, Stack, Typography } from '@mui/material';
import { Favorite } from '../../entities/favorite.entity';
import { dateToFormat } from '../../utils/date';

type Props = {
  favorite: Favorite;
};

export const FavoriteItem = (props: Props) => {
  const dateString = dateToFormat({ value: props.favorite.date });

  return (
    <Paper>
      <Stack direction="row" justifyContent="space-between" sx={{ p: 3 }}>
        <Typography variant="h5">{dateString}</Typography>
        <Button href={`/?date=${dateString}`}>View data</Button>
      </Stack>
    </Paper>
  );
};
