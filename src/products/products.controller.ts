import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return {
        data: await this.productsService.create(createProductDto),
        status: 'success',
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Get()
  async findAll() {
    try {
      return {
        data: await this.productsService.findAll(),
        status: 'success',
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return {
        data: await this.productsService.findOne(+id),
        status: 'success',
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return {
        data: await this.productsService.update(+id, updateProductDto),
        status: 'success',
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return {
        data: await this.productsService.remove(+id),
        status: 'success',
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }
}
