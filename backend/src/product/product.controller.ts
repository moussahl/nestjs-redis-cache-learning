import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductService } from './product.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update.product.dto.js';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts() {
    const products = await this.productService.getProducts();

    return {
      success: true,
      message: 'Products retrieved successfully',
      data: products,
    };
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.getProduct(id);

    return {
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    };
  }

  @Post()
  async createProduct(@Body() data: CreateProductDto) {
    const product = await this.productService.createProduct(data);

    return {
      success: true,
      message: 'Product created successfully',
      data: product,
    };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductDto,
  ) {
    const product = await this.productService.updateProduct(id, data);

    return {
      success: true,
      message: 'Product updated successfully',
      data: product,
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.deleteProduct(id);

    return {
      success: true,
      message: 'Product deleted successfully',
      data: product,
    };
  }
}
