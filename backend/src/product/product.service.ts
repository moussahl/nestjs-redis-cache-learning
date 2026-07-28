import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, Product } from '../generated/prisma/client';

@Injectable()
export class ProductService {

    constructor(private prisma: PrismaService){}

    async getProducts(){
        return await this.prisma.product.findMany()
    }

    async getProduct(id: number){
        return await this.prisma.product.findUnique({
            where:{
                id: Number(id)
            }
        })
    }


    async createProduct(data: Prisma.ProductCreateInput): Promise<Product>{
        return  await this.prisma.product.create({
            data
        })
    }














}
