export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type?: 'seller' | 'buyer' | 'admin';
  address?: string;
  isActive: boolean;
  userImage?: string;
}
