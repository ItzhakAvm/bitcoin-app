import { Injectable } from '@nestjs/common';
import { RecordsRepository } from './records.repository';
import { GetByDateDto } from './dto/get-by-date.dto';
import axios from 'axios';
import * as moment from 'moment';
import { Currency, Rate, RecordQueryResult } from '../types/crypto';

@Injectable()
export class CryptoService {
  constructor(private recordsRepository: RecordsRepository) {}

  getByDate<T extends boolean>(
    getByDateDto: GetByDateDto,
    withFavoriteIndicator: T,
  ): Promise<RecordQueryResult<T>> {
    return this.recordsRepository.getByDate(
      getByDateDto,
      withFavoriteIndicator,
    );
  }

  async fetch(): Promise<boolean> {
    const url =
        `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC` +
        `&market=ILS&apikey=${process.env.ALPHAVANTAGE_API_KEY}`,
      dataKey = 'Time Series (Digital Currency Daily)',
      result = (await axios.get(url)).data[dataKey];

    const API_DATE_FORMAT = 'yyyy-MM-DD';

    const extractRateAndCurrency = (key): [Rate, Currency] => {
      const matches = /(?:\w+\.\s+)(\w+)(?:(?:\s+\()(\w+)(?:\)))?/.exec(key);
      return [<Rate>matches[1], <Currency>matches[2]];
    };

    const dataTransformer = (date, records) =>
      Object.entries(records)
        .map(([key, price]) => {
          const [rate, currency] = extractRateAndCurrency(key);

          if (!(rate in Rate) && currency === undefined) {
            return;
          }

          return {
            date: moment(date, API_DATE_FORMAT).toDate(),
            currency,
            rate,
            price: parseInt(<string>price),
          };
        })
        .filter((record) => record);

    const records = Object.entries(result).reduce(
      (prev, [date, records]) => prev.concat(dataTransformer(date, records)),
      [],
    );

    return await this.recordsRepository.seed(records);
  }
}
