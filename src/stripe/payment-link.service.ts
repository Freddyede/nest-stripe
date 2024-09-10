import { Injectable } from "@nestjs/common";
import { AbstractStripeService } from "./abstractStripe.service";
import { Stripe } from "stripe";
import { ProductsService } from "./products.service";

@Injectable()
export class PaymentLinkService extends AbstractStripeService {
  private _paymentLinks: Stripe.PaymentLink[] = [];
  constructor(
    private _productService: ProductsService
  ) {
    super();
  }
  get productService(): ProductsService { return this._productService;}
  async getPaymentLinkedLists() {
    try {
      const products = await this.stripe.paymentLinks.list();
      for (const product of products.data) {
        if(product.active) this._paymentLinks.push(product)
      }
      return this._paymentLinks;
    } catch (error) {
      console.error('Failed to fetch payment link from Stripe', error.stack);
      throw new Error('Unable to fetch products from Stripe');
    }
  }
  async createPaymentLink(paymentLink: {price: string; quantity: number;}) {
    if(paymentLink.quantity === undefined) paymentLink.quantity = 1;
    try {
      if(paymentLink.price.startsWith('price_')) {
        await this.stripe.paymentLinks.create({
          line_items: [
            {
              price: paymentLink.price,
              quantity: paymentLink.quantity,
            },
          ],
        });
        return {
          status: 201,
          message: 'New payment link created successfully',
          list: this.productService.getProducts()
        };
      } else {
        return {
          status: 500,
          message: 'Missing field'
        }
      }
    }catch (error) {
      console.error('Failed to fetch products from Stripe', error.stack);
      throw new Error('Unable to fetch products from Stripe');
    }
  }
  async addPaymentLinkProduct(product: {price: string, quantity: number}) {
    return await this.createPaymentLink(product);
  }
}