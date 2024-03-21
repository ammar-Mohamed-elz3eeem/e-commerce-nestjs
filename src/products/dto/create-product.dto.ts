export class CreateProductDto {
  name: string;

  description: string;

  price: number;

  stockQuantity: number;

  catId?: number;

  prodImage?: string;
}
