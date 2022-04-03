import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  insertProduct(title: string, desc: string, price: number): string {
    const id = Math.random().toString();
    const newProduct = new Product(id, title, desc, price);
    this.products.push(newProduct);
    return id;
  }
  getProducts(): Product[] {
    return [...this.products];
  }
  getSingleProduct(prodId: string): Product {
    const product = this.findProduct(prodId)[0];
    return product;
  }
  updateProduct(
    id: string,
    title: string,
    des: string,
    price: number,
  ): Product {
    const [product, index] = this.findProduct(id);
    const updateProduct = { ...product };
    if (title) {
      updateProduct.title = title;
    }
    if (des) {
      updateProduct.description = des;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.products[index] = updateProduct;
    return updateProduct;
  }
  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((el) => el.id === id);
    if (!productIndex && productIndex !== 0) {
      throw new NotFoundException('Could Not find Product');
    }
    return [this.products[productIndex], productIndex];
  }

  deleteProduct(id: string) {
    const filteredProducts = this.products.filter((el) => el.id !== id);
    this.products = filteredProducts;
  }
}
