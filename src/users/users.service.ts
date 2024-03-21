import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { compareSync, genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll() {
    try {
      const users = await this.userModel.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async read(userId: number) {
    try {
      const users = await this.userModel.findByPk(userId);
      return users;
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);
      const isUser = await this.userModel.findOne({where: {email: createUserDto.email}});
      if (isUser) {
        throw new Error('User Already Exist');
      }

      const salt = await genSalt(10);
      console.log(createUserDto.password, salt);
      const hashedPassword = await hash(createUserDto.password, salt);

      await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return await this.authenticate({
        email: createUserDto.email,
        password: createUserDto.password,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel.update(
        { ...updateUserDto },
        { where: { id: userId } },
      );

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: number) {
    try {
      const deletedUser = await this.userModel.destroy({
        where: { id: userId },
      });

      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  async authenticate({ email, password }) {
    try {
      const user = await this.userModel.findOne({ where: { email } });
      if (!user) throw new Error('User not found');

      console.log(user, password);

      if (!compareSync(password, user.password))
        throw new Error('Password incorrect');

      const token = sign(
        { id: user.id, email: user.email, type: user.type },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1d' },
      );

      return token;
    } catch (error) {
      throw error;
    }
  }

  async getMe(authHeader: string) {
    try {
      return await new Promise((resolve, reject) => {
        verify(authHeader, process.env.JWT_SECRET, (err, user) => {
          if (err) reject(err);
          console.log(user);
          resolve(user);
        });
      });
    } catch (error) {
      throw error;
    }
  }
}
