import { Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { refetchData } from '../../services/crypto.service';
import { useNavigate } from 'react-router-dom';

export const RefetchAlert = () => {
  const navigate = useNavigate(),
    [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    refetchData().then(() => navigate(0));
  };

  return (
    <Alert
      severity="info"
      action={
        <LoadingButton
          loading={loading}
          color="inherit"
          size="small"
          onClick={handleClick}
        >
          Refetch
        </LoadingButton>
      }
    >
      Looks like there's no data to display for this date. Try re-fetch the data
      from the API.
    </Alert>
  );
};
