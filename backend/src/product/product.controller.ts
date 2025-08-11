import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import type { File as MulterFile } from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
@Post(':id/upload')
@UseInterceptors(FileInterceptor('image'))
async uploadImage(
  @Param('id') id: string,
  @UploadedFile() file: MulterFile,
) {
  const streamUpload = () => {
    return new Promise<{ url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'products' },
        (error, result) => {
          if (result) {
            resolve({ url: result.secure_url });
          } else {
            reject(error);
          }
        },
      );
      Readable.from(file.buffer).pipe(stream);
    });
  };

  const result = await streamUpload();
  await this.productService.addImageToProduct(+id, result.url);

  return {
    message: 'Image uploaded successfully',
    imageUrl: result.url,
  };
}

}