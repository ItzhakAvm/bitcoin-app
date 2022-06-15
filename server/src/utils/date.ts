import * as moment from 'moment';

export const DATE_FORMAT = 'DD/MM/yyyy';

export const formatToDate = ({ value }: { value: string | null }): Date =>
  value === null ? new Date() : moment(value, DATE_FORMAT).toDate();

export const dateToFormat = ({ value }: { value: Date }): string =>
  moment(value).format(DATE_FORMAT);
