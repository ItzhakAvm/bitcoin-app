import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { dateToFormat } from '../../utils/date';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Transform(dateToFormat, {
    toPlainOnly: true,
  })
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
