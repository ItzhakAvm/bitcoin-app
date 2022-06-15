import { IconButton, Tooltip } from '@mui/material';
import {
  Star as StarIcon,
  StarOutline as StarOutlineIcon,
} from '@mui/icons-material';
import { useRecordResponseContext } from '../../contexts/record-response.context';
import { addFavorite, removeFavorite } from '../../services/favorites.service';

type Props = {
  date: Date;
};

export const FavoriteButton = (props: Props) => {
  const [recordResponse, setRecordResponse] = useRecordResponseContext();

  const handleClick = () => {
    if (props.date !== null) {
      (recordResponse.isFavorite ? removeFavorite : addFavorite)(props.date);

      setRecordResponse((previous) => ({
        ...previous,
        isFavorite: !previous.isFavorite,
      }));
    }
  };

  return (
    <Tooltip title="Add date to favorites">
      <IconButton onClick={handleClick}>
        {recordResponse?.isFavorite ? <StarIcon /> : <StarOutlineIcon />}
      </IconButton>
    </Tooltip>
  );
};
