import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const addedProduct = await this.productModel.create({
        ...createProductDto,
      });
      return addedProduct;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const allProds = await this.productModel.findAll();
      return allProds;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const prod = await this.productModel.findByPk(id);
      return prod;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const editedProd = await this.productModel.update(
        {
          ...updateProductDto,
        },
        { where: { id } },
      );
      return editedProd;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletedProd = await this.productModel.destroy({ where: { id } });
      return deletedProd;
    } catch (error) {
      throw error;
    }
  }
}
