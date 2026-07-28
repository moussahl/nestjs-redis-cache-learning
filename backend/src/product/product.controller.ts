import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';

@Controller('products')
export class ProductController {

constructor(private productService: ProductService){}


@Get()
getProducts(){

    return this.productService.getProducts()

}

@Get(':id')
getProduct(@Param('id') id:string ){
   return this.productService.getProduct(Number(id));
}

@Post()
createProduct(@Body() data:CreateProductDto){
    return this.productService.createProduct(data)
}



}
