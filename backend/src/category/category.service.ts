import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category)
  private readonly repo:Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.repo.insert(createCategoryDto);
  }

  async findAll() {
    return await this.repo.find()
  }

  async findOne(id: number) {
    const category= await this.repo.findOne({ where: { id } })
  if (!category) {
      throw new BadRequestException(`category ID ${id} is not found`);
    }
    return category ;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.repo.update(id,updateCategoryDto);
  }

  async remove(id: number):Promise<DeleteResult> {
    const del=await this.repo.delete(id)
    if (del.affected===0) {
      throw new BadRequestException(`category ID ${id} is not found`);
    }
    return del;
  }
}
