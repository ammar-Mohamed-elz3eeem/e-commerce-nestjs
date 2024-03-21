import { INTEGER } from 'sequelize';
import {
  AutoIncrement,
  Model,
  Column,
  Default,
  PrimaryKey,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Table({ createdAt: false, updatedAt: false })
export class OrderProduct extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(INTEGER)
  id: number;

  @Default(0)
  @Column(INTEGER)
  quantity: number;

  @Column(INTEGER)
  @ForeignKey(() => Product)
  prodId: number;

  @Column(INTEGER)
  @ForeignKey(() => Order)
  orderId: number;
}
