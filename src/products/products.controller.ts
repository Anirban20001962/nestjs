import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDes: string,
    @Body('price') prodPrice: number,
  ): { id: string } {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDes,
      prodPrice,
    );
    return {
      id: generatedId,
    };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string): Product {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDes: string,
    @Body('price') prodPrice: number,
  ) {
    return this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDes,
      prodPrice,
    );
  }
  @Delete(':id')
  deleteProduct(@Param('id') prodId: string): { message: string } {
    this.productsService.deleteProduct(prodId);
    return { message: 'Product deleted' };
  }
}
