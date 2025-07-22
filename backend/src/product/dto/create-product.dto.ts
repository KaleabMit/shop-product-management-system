import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    productname: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
