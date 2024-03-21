import { ENUM, INTEGER } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  Default,
  PrimaryKey,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { OrderProduct } from 'src/order_products/entities/order_product.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Table({ updatedAt: false })
export class Order extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(INTEGER)
  name: string;

  @Default('opened')
  @Column(ENUM('closed', 'opened'))
  status: string;

  @BelongsToMany(() => Product, () => OrderProduct)
  products: Product[];

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  user: User;
}
