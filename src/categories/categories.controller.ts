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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return {
        data: await this.categoriesService.create(createCategoryDto),
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
        data: await this.categoriesService.findAll(),
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
        data: await this.categoriesService.findOne(+id),
        status: 'success',
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return {
        data: await this.categoriesService.update(+id, updateCategoryDto),
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
        data: await this.categoriesService.remove(+id),
        status: 'success',
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }
}
