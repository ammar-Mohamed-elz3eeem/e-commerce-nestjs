import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderProduct } from 'src/order_products/entities/order_product.entity';

try {
} catch (error) {
  throw error;
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderProduct) private orderProductModel: typeof OrderProduct,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      return await this.orderModel.create({ ...createOrderDto });
    } catch (error) {
      throw error;
    }
  }

  async index() {
    try {
      return await this.orderModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  async show(id: number) {
    try {
      return await this.orderModel.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.orderModel.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async close(id: number) {
    try {
      return await this.orderModel.update(
        { status: 'closed' },
        { where: { id } },
      );
    } catch (error) {
      throw error;
    }
  }

  async showLastPurchases() {
    try {
      return await this.orderModel.findAll({
        include: {
          model: User,
          required: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async addProductToOrder(prodId: number, quantity: number, orderId: number) {
    try {
      const cart = await this.orderModel.findByPk(orderId);
      if (!cart) {
        throw new Error('Order Not Found');
      }

      if (cart.dataValues.status === 'closed') {
        throw new Error("Can't add product to closed order");
      }

      const orderProduct = await this.orderProductModel.create({
        quantity,
        orderId,
        prodId,
      });
      return orderProduct;
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromOrder(prodId) {
    try {
      return this.orderProductModel.destroy({ where: { prodId } });
    } catch (error) {
      throw error;
    }
  }
}
