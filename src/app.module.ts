import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderProductsModule } from './order_products/order_products.module';
import { User } from './users/entities/user.entity';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { OrderProduct } from './order_products/entities/order_product.entity';
import { Order } from './orders/entities/order.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UsersModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    OrderProductsModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      uri: process.env.DB_URL,
      models: [User, Order, OrderProduct, Category, Product],
      autoLoadModels: true,
      sync: { force: true },
      retryAttempts: 3,
    }),
  ],
})
export class AppModule {}
