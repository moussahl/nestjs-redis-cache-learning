import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { Prisma, Product } from '../generated/prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  // GET ALL PRODUCTS
  async getProducts() {
    try {
      const cacheKey = 'products:all';

      const cachedProducts = await this.cacheManager.get(cacheKey);

      if (cachedProducts) {
        console.log('FROM REDIS');
        return cachedProducts;
      }

      const products = await this.prisma.product.findMany();

      await this.cacheManager.set(cacheKey, products);

      console.log('FROM DATABASE');

      return products;
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve products');
    }
  }

  // GET ONE PRODUCT
  async getProduct(id: number) {
    try {
      const cacheKey = `product:${id}`;

      const cachedProduct = await this.cacheManager.get(cacheKey);

      if (cachedProduct) {
        console.log('FROM REDIS');
        return cachedProduct;
      }

      const product = await this.prisma.product.findUnique({
        where: {
          id,
        },
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      await this.cacheManager.set(cacheKey, product);

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Could not retrieve product');
    }
  }

  // CREATE PRODUCT
  async createProduct(dto: CreateProductDto): Promise<Product> {
    try {
      const product = await this.prisma.product.create({
        data: {
          ...dto,
        },
      });

      await this.cacheManager.del('products:all');

      return product;
    } catch (error) {
      throw new InternalServerErrorException('Could not create product');
    }
  }

  // UPDATE PRODUCT
  async updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
    try {
      const product = await this.prisma.product.update({
        where: {
          id,
        },

        data: {
          ...dto,
        },
      });

      await this.cacheManager.del('products:all');

      await this.cacheManager.del(`product:${id}`);

      return product;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      throw new InternalServerErrorException('Could not update product');
    }
  }

  // DELETE PRODUCT
  async deleteProduct(id: number): Promise<Product> {
    try {
      const product = await this.prisma.product.delete({
        where: {
          id,
        },
      });

      await this.cacheManager.del('products:all');

      await this.cacheManager.del(`product:${id}`);

      return product;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      throw new InternalServerErrorException('Could not delete product');
    }
  }
}
