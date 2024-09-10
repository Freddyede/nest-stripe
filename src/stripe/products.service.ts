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
  private async addProduct(product: IProduct) {
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
  }
  private async verifyProduct(product: IProduct) {
    return (
      (product.name !== '' || product.name !== undefined) &&
      product.default_price_data.unit_amount > 0 &&
      (product.default_price_data.currency !== '' || product.default_price_data.currency !== undefined)
    )
  }
  async tryProductAdding(product: IProduct) {
    if(await this.verifyProduct(product)) {
      await this.addProduct(product);
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
  }
  async catchProduct(error: Error) {

    console.error('Failed to fetch products from Stripe', error.stack);
    throw new Error('Unable to fetch products from Stripe');
  }
  async createProduct(product: IProduct) {
    try {
      await this.tryProductAdding(product);
    } catch (error) {
      await this.catchProduct(error);
    }
  }
}
