import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async showAllOrders() {
    try {
      return {
        status: 'success',
        data: await this.ordersService.index(),
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Post()
  async createOrder(@Body() data: CreateOrderDto) {
    try {
      return {
        status: 'success',
        data: await this.ordersService.create(data),
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Get('/:id')
  async showOrderById(@Param('id') id: string) {
    try {
      return {
        status: 'success',
        data: await this.ordersService.show(+id),
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Delete('/:id')
  async deleteOrderById(@Param('id') id: string) {
    try {
      return {
        status: 'success',
        data: await this.ordersService.remove(+id),
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Put('/:id/product')
  async addProductToOrder(
    @Param('id') id: string,
    @Body() body: { prodId: number; quantity: number },
  ) {
    try {
      return {
        status: 'success',
        data: await this.ordersService.addProductToOrder(
          body.prodId,
          body.quantity,
          +id,
        ),
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Delete('/:id/product')
  async removeProductFromOrder(@Body() body: { prodId: number }) {
    try {
      return {
        status: 'success',
        data: await this.ordersService.removeProductFromOrder(body.prodId),
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Patch('/:id')
  async closeOrder(@Param('id') id: string) {
    try {
      return {
        status: 'success',
        data: await this.ordersService.close(+id),
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }
}
