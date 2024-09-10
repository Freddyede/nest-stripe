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
    await this.paymentService.addPaymentLinkProduct({ name: 'my product test 2', quantity: 2 });
    return this.paymentService.getPaymentLinkedLists();
  }
  async getProducts(): Promise<Stripe.Product[]> {
    return this.paymentService.productService.getProducts();
  }
}
