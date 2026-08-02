import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, Product } from '../generated/prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  //Get all products
  async getProducts() {
    const cacheKey = 'products:all';

    // Check Redis
    const cachedProducts = await this.cacheManager.get(cacheKey);

    if (cachedProducts) {
      console.log('FRPOM REDIS');
      return cachedProducts;
    }

    //Get from Database
    const products = await this.prisma.product.findMany();

    // Save in Redis
    await this.cacheManager.set(cacheKey, products);

    console.log('FROM DATABASE');

    return products;
  }

  async getProduct(id: number) {
    const cacheKey = `product:${id}`;

    //verify Redis
    const cahcedProduct = await this.cacheManager.get(cacheKey);

    if (cahcedProduct) {
      return cahcedProduct;
    }

    // Get from DATABASE
    const product = await this.prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    //Save in Redis
    if (product) {
      await this.cacheManager.set(cacheKey, product);
    }

    return product;
  }

  // Create Prodcut
  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    // Save DATABSE
    const product = this.prisma.product.create({
      data,
    });

    // Invalidate cache

    const cacheKey = `products:all`;
    await this.cacheManager.del(cacheKey);

    return product;
  }
}
