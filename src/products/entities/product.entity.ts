import { TEXT } from 'sequelize';
import { INTEGER } from 'sequelize';
import { STRING } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/categories/entities/category.entity';
import { OrderProduct } from 'src/order_products/entities/order_product.entity';
import { Order } from 'src/orders/entities/order.entity';

@Table
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(INTEGER)
  id: number;

  @AllowNull(false)
  @Column(STRING(100))
  name: string;

  @AllowNull(false)
  @Column(TEXT)
  description: string;

  @AllowNull(false)
  @Column(INTEGER)
  price: number;

  @Default(0)
  @Column(INTEGER({ length: 7 }))
  stockQuantity: number;

  @BelongsTo(() => Category, {
    onDelete: 'Cascade',
    onUpdate: 'Cascade',
    foreignKey: 'catId',
  })
  category: Category;

  @Default('product-default-image')
  @Column(STRING(100))
  prodImage: string;

  @BelongsToMany(() => Order, () => OrderProduct)
  orders?: Order[];
}
