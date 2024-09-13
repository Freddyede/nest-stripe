import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { Stripe } from 'stripe';
import { StripeProductDTO } from '../dto/stripe-product.dto';
import { ProductsService } from '../services/products.service';

@Controller('/stripe/products')
export class StripeProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getProducts(): Promise<Stripe.Product[]> {
    try {
      return await this.productService.getProducts();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch customers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Put(':id')
  async updateProduct(@Req() req: any,@Body() product: StripeProductDTO) {
    try {
      return await this.productService.updateProduct(req.params.id, product)
    } catch (error) {
      throw new HttpException(
        'Failed to fetch customers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post()
  async createProduct(@Body() product: any) {
    try {
      return await this.productService.createProduct(product);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch customers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.productService.deleteProduct(id);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch customers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}