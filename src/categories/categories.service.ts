import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const addedcategory = await this.categoryModel.create({
        ...createCategoryDto,
      });
      return addedcategory;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const allCategories = await this.categoryModel.findAll();
      return allCategories;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryModel.findByPk(id);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const editedCategory = await this.categoryModel.update(
        {
          ...updateCategoryDto,
        },
        { where: { id } },
      );
      return editedCategory;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletedCategory = await this.categoryModel.destroy({
        where: { id },
      });
      return deletedCategory;
    } catch (error) {
      throw error;
    }
  }
}
