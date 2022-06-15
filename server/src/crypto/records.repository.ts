import { EntityRepository, Repository } from 'typeorm';
import { Record } from './entities/record.entity';
import { GetByDateDto } from './dto/get-by-date.dto';
import { RecordQueryResult } from '../types/crypto';

@EntityRepository(Record)
export class RecordsRepository extends Repository<Record> {
  async getByDate<T extends boolean>(
    getByDateDto: GetByDateDto,
    withFavoriteIndicator: T,
  ): Promise<RecordQueryResult<T>> {
    const options = {
      where: getByDateDto,
      relations: withFavoriteIndicator ? ['favorite'] : [],
    };

    const records = await this.find(options),
      isFavorite = records.some((record) => record.favorite);

    if (withFavoriteIndicator.valueOf() === true) {
      return { isFavorite, records } as RecordQueryResult<T>;
    }

    return records as RecordQueryResult<T>;
  }

  async seed(records): Promise<boolean> {
    await this.truncate();
    return Boolean((await this.save(this.create(records))).length);
  }

  async truncate() {
    return this.query(`TRUNCATE ${this.metadata.tableName};`);
  }
}
