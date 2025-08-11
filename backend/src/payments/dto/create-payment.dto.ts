import { IsNumber, Min, IsEmail, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PaymentItemDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total: number;
}

export class CreatePaymentDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsEmail()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentItemDto)
  items: PaymentItemDto[];
}
