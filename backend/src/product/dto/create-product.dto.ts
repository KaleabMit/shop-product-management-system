/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    productname: string;

    @IsOptional()
    @IsString()
    description: string;


    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    image: string;

    @IsOptional()
    @IsNumber()
    discount: number;

}