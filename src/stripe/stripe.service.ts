import {Injectable} from '@nestjs/common';
import Stripe from 'stripe';
import 'dotenv/config';
import { PaymentLinkService } from "./payment-link.service";

@Injectable()
export class StripeService {

  constructor(
    private paymentService: PaymentLinkService,
  ) {
  }
  async getPaymentLists(): Promise<Stripe.PaymentLink[]> {
    await this.paymentService.productService.createProduct({name: 'my test 4FEZ44Z', default_price_data: {unit_amount: 100, currency: 'usd'}});
    await this.paymentService.addPaymentLinkProduct({ name: 'my test', quantity: 1 });
    return this.paymentService.getPaymentLinkedLists();
  }
  async getProducts(): Promise<Stripe.Product[]> {
    return this.paymentService.productService.getProducts();
  }
}
