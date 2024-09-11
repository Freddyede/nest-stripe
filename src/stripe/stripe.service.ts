import {Injectable} from '@nestjs/common';
import Stripe from 'stripe';
import 'dotenv/config';
import { PaymentLinkService } from "./payment-link.service";

/**
 * TODO Stripe :
 *  - Attendre le paiement
 *  - Remboursement du trajet
 */

@Injectable()
export class StripeService {
  constructor(private paymentService: PaymentLinkService) {}

  async getPaymentLists(): Promise<Stripe.PaymentLink[]> {
    await this.paymentService.productService.createProduct({name: 'my test 4FEZ44Z', default_price_data: {unit_amount: 100, currency: 'usd'}});
    let products = await this.paymentService.productService.getProducts();
    console.log(products);
    await this.paymentService.addPaymentLinkProduct({ price: 'price_1PxUXjEp12gOpkuFRGLVe7qo', quantity: 1 });
    return this.paymentService.getPaymentLinkedLists();
  }

  async getProducts(): Promise<Stripe.Product[]> {
    return this.paymentService.productService.getProducts();
  }
}
