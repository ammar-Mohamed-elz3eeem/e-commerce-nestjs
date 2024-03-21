import { Controller } from '@nestjs/common';
import { OrderProductsService } from './order_products.service';

@Controller('order-products')
export class OrderProductsController {
  constructor(private readonly orderProductsService: OrderProductsService) {}
}
