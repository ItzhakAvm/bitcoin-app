import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DATE_FORMAT, formatToDate } from '../../utils/date';
import { TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';

type Props = {
  date: Date;
  onDateChange: (newValue: Date) => any;
};

export const DatePicker = (props: Props) => {
  const [query] = useSearchParams();

  useEffect(() => {
    const dateParam = query.get('date');

    props.onDateChange(
      dateParam
        ? formatToDate({ value: dateParam })
        : moment().subtract(1, 'day').toDate(),
    );
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Select date to display"
        inputFormat={DATE_FORMAT.replace('DD', 'dd')}
        renderInput={(params) => <TextField {...params} />}
        value={props.date}
        onChange={props.onDateChange}
      />
    </LocalizationProvider>
  );
};
