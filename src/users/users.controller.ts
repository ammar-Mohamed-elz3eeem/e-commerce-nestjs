import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Get('/me')
  async getMe(@Headers('authorization') auth: string) {
    try {
      return {
        result: await this.usersService.getMe(auth),
        status: 'success',
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    try {
      return {
        status: 'success',
        result: await this.usersService.create(data),
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Get('/:id')
  async read(@Param('id') id: string) {
    try {
      return {
        status: 'success',
        result: await this.usersService.read(+id),
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    try {
      return {
        status: 'success',
        result: await this.usersService.update(+id, data),
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    try {
      return {
        status: 'success',
        result: await this.usersService.delete(+id),
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Post('/login')
  async authenticate(@Body() data: { email: string; password: string }) {
    try {
      return {
        result: await this.usersService.authenticate(data),
        status: 'success',
      };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }
}
