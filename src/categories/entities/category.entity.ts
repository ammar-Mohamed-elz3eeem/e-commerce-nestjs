import { INTEGER } from 'sequelize';
import { STRING } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  Default,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({ updatedAt: false })
export class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(INTEGER)
  id: number;

  @AllowNull(false)
  @Unique
  @Column(STRING(100))
  name: string;

  @Default('cat-default-image')
  @Column(STRING(500))
  catImage: string;
}
