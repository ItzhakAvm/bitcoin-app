import { Button, ButtonGroup, Paper, Stack, Typography } from '@mui/material';
import Chart from './Chart';
import React, { useEffect, useState } from 'react';
import { dateToFormat } from '../../utils/date';
import { Currency } from '../../types/crypto';
import { getByDate } from '../../services/crypto.service';
import {
  RecordResponseProvider,
  useRecordResponseContext,
} from '../../contexts/record-response.context';
import { DatePicker } from './DatePicker';
import { FavoriteButton } from './FavoriteButton';
import { RefetchAlert } from './RefetchAlert';

const Dashboard = React.memo(() => {
  const DashboardWrapper = () => {
    const [date, setDate] = useState<Date | null>(null),
      [displayCurrency, setDisplayCurrency] = useState<Currency>(Currency.USD),
      [recordResponse, setRecordResponse] = useRecordResponseContext();

    useEffect(() => {
      if (date !== null) {
        getByDate(date).then(setRecordResponse);
      }
    }, [date]);

    const shouldRefetch =
      Array.isArray(recordResponse?.records) &&
      recordResponse.records.length === 0;

    const currencyButtons = Object.values(Currency).map((currency) => (
      <Button
        key={currency}
        variant={currency === displayCurrency ? 'contained' : 'outlined'}
        onClick={() => setDisplayCurrency(currency)}
      >
        {currency}
      </Button>
    ));

    return (
      <>
        {shouldRefetch && <RefetchAlert />}
        <DatePicker date={date} onDateChange={setDate} />
        <Paper sx={{ p: 3 }}>
          <Stack direction="row" alignItems="start" sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ flexGrow: 1 }}>
              {dateToFormat({ value: date })}
            </Typography>
            <ButtonGroup aria-label="small button group" sx={{ mr: 2 }}>
              {currencyButtons}
            </ButtonGroup>
            <FavoriteButton date={date} />
          </Stack>
          <Chart displayCurrency={displayCurrency} />
        </Paper>
      </>
    );
  };

  return (
    <RecordResponseProvider>
      <DashboardWrapper />
    </RecordResponseProvider>
  );
});

export default Dashboard;
