import { ENUM } from 'sequelize';
import { BOOLEAN } from 'sequelize';
import { STRING } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  Default,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({ updatedAt: false })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: 'int', allowNull: false })
  id: number;

  @AllowNull(false)
  @Column(STRING(100))
  firstName: string;

  @AllowNull(false)
  @Column(STRING(100))
  lastName: string;

  @IsEmail
  @AllowNull(false)
  @Unique
  @Column(STRING(150))
  email: string;

  @AllowNull(false)
  @Column(STRING(80))
  password: string;

  @AllowNull(false)
  @Default('buyer')
  @Column(ENUM('seller', 'buyer', 'admin'))
  type: 'seller' | 'buyer' | 'admin';

  @Column(STRING(1000))
  address: string;

  @Default(0)
  @Column(BOOLEAN)
  isActive: boolean;

  @Default('avatar-default-image')
  @Column(STRING(100))
  userImage: string;
}
