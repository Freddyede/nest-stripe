import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Stripe } from 'stripe';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('paymentLists')
  async getProducts(): Promise<Stripe.PaymentLink[]> {
    try {
      return await this.stripeService.getPaymentLists();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to fetch products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('products')
  async getCustomers(): Promise<Stripe.Product[]> {
    try {
      return await this.stripeService.getProducts();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch customers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}