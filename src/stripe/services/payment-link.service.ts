import { Injectable } from "@nestjs/common";
import { AbstractStripeService } from "../abstract/abstractStripe.service";
import { Stripe } from "stripe";
import { ProductsService } from "./products.service";
import { StripePaymentLinkDTO } from '../dto/stripePaymentLink.dto';

@Injectable()
export class PaymentLinkService extends AbstractStripeService {
  private _paymentLinks: Stripe.PaymentLink[] = [];
  constructor(private _productService: ProductsService) {
    super();
  }
  get productService(): ProductsService { return this._productService;}
  async getPaymentLinkedLists() {
    try {
      const paymentLinks = await this.stripe.paymentLinks.list();
      for (const paymentLink of paymentLinks.data) {

        if(paymentLink.active) this._paymentLinks.push(paymentLink);
      }
      return this._paymentLinks;
    } catch (error) {
      console.error('Failed to fetch payment link from Stripe', error.stack);
      throw new Error('Unable to fetch products from Stripe');
    }
  }
  async addProductToPaymentLink(product: StripePaymentLinkDTO) {
    try {
      let sProduct = await this.productService.findProductByName(product.name);
      if(sProduct !== undefined) {

        let newProduct = {
          price: sProduct.default_price,
          quantity: product.quantity
        };
        await this.createPaymentLink(newProduct);
        return {status: 201, message: `Product ${product.name} added successfully`};
      }
    } catch (error) {
      console.error('Failed to fetch payment link from Stripe', error.stack);
      throw new Error('Unable to fetch products from Stripe');
    }
  }
  private async createPaymentLink(paymentLink: {price: string | Stripe. Price, quantity: number}) {

    console.log(paymentLink);
    await this.stripe.paymentLinks.create({
      line_items: [
        {
          price: paymentLink.price.toString(),
          quantity: paymentLink.quantity,
        },
      ],
    });
  }
}