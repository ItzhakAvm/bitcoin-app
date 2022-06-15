import moment from 'moment';

export const DATE_FORMAT = 'DD/MM/yyyy';

export const formatToDate = ({ value }: { value: string }): Date =>
  moment(value, DATE_FORMAT).toDate();

export const dateToFormat = ({ value }: { value: Date }): string =>
  moment(value).format(DATE_FORMAT);
