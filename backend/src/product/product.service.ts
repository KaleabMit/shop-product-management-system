import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProductService {
constructor(@InjectRepository(Product) private readonly repo: Repository<Product>) {}

  async create(createProductDto: CreateProductDto) {
    return await this.repo.insert(createProductDto);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) {
      throw new BadRequestException(`Product ID ${id} is not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.repo.update(id, updateProductDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    const del= await this.repo.delete(id);
if(del.affected===0){
  throw new BadRequestException(`Product ID ${id} is not found`)
}
return del;
    
  }
}
