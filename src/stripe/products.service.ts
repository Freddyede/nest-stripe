import { Injectable } from "@nestjs/common";
import { AbstractStripeService } from "./abstractStripe.service";
import { Stripe } from "stripe";

interface IProduct {
  name: string;
  default_price_data: {
    unit_amount: any;
    currency: string;
  }
}

@Injectable()
export class ProductsService extends AbstractStripeService {
  constructor() {
    super();
  }

  private _products: Stripe.Product[] = [];
  protected set products(product: Stripe.Product) {
    this._products = !this._products.includes(product) ? [...this._products, product] : [...this._products];
  }
  protected get products(): Stripe.Product[] { return this._products; }

  async getProducts(): Promise<Stripe.Product[]> {
    try {
      const products = await this.stripe.products.list();
      for (const product of products.data) {
        if(product.active) this._products.push(product)
      }
      return this._products;
    } catch (error) {
      console.error('Failed to fetch products from Stripe', error.stack);
      throw new Error('Unable to fetch products from Stripe');
    }
  }
  async createProduct(product: IProduct) {
    try {
      if(
        (product.name !== '' || product.name !== undefined) &&
        product.default_price_data.unit_amount > 0 &&
        (product.default_price_data.currency !== '' || product.default_price_data.currency !== undefined)
      ) {
        console.log(await this.convertEURtoUSD(product.default_price_data.unit_amount));
        await this.stripe.products.create({
          name: product.name,
          default_price_data: {
            unit_amount_decimal: await this.convertEURtoUSD(product.default_price_data.unit_amount),
            currency: product.default_price_data.currency,
            recurring: {
              interval: 'month',
            },
          }
        });
        return {
          status: 201,
          message: 'New product created successfully',
        };
      } else {
        return {
          status: 500,
          message: 'Missing field'
        }
      }
    } catch (error) {
      console.error('Failed to fetch products from Stripe', error.stack);
      throw new Error('Unable to fetch products from Stripe');
    }
  }
  async getProductPriceByProductName(productName: string): Promise<any> {
    try {
      console.log(this._products);
      const products = await this.stripe.products.list();
      return products.data.find(product => product.name === productName).default_price;
    } catch (error) {
      console.error('Failed to fetch products from Stripe', error.stack);
      throw new Error('Unable to fetch products from Stripe');
    }
  }

}
