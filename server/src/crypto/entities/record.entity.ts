import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Currency, Rate } from '../../types/crypto';
import { Exclude, Transform } from 'class-transformer';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { dateToFormat } from '../../utils/date';

@Entity()
export class Record {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('timestamp')
  @Transform(dateToFormat, {
    toPlainOnly: true,
  })
  date: Date;

  @Column({ type: 'enum', enum: Rate })
  rate: Rate;

  @Column({ type: 'enum', enum: Currency })
  currency: Currency;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @ManyToOne(() => Favorite, (favorite) => favorite.date, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'date', referencedColumnName: 'date' })
  @Exclude()
  favorite: Favorite;
}
