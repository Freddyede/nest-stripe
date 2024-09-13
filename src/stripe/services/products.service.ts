import { Injectable } from '@nestjs/common';
import { AbstractStripeService } from '../abstract/abstractStripe.service';
import { Stripe } from 'stripe';
import { StripeProductDTO } from '../dto/stripe-product.dto';
import { StripeNameProductDTO } from '../dto/stripeName-product.dto';

@Injectable()
export class ProductsService extends AbstractStripeService {
  constructor() {
    super();
  }
  private _products: Stripe.Product[] = [];
  protected set products(product: Stripe.Product) {
    this._products = !this._products.includes(product)
      ? [...this._products, product]
      : [...this._products];
  }
  protected get products(): Stripe.Product[] {
    return this._products;
  }
  get productsArray() { return this._products; }
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
  async findProductByName(productName: string) {
    try {

      await this.getProducts();
      return this._products.find((product) => product.name === productName);
    } catch (error) {
      console.error('Failed to fetch products from Stripe', error.stack);
      throw new Error(`Unable to find ${productName} from Stripe`);
    }
  }
  private async addProduct(product: StripeProductDTO): Promise<void> {
    await this.stripe.products.create({
      name: product.name,
      default_price_data: {
        unit_amount_decimal: await this.convertEURtoUSD(
          product.default_price_data.unit_amount,
        ),
        currency: product.default_price_data.currency,
        recurring: {
          interval: 'month',
        },
      },
    });
  }
  async getIdByName(product: StripeNameProductDTO): Promise<string> {

    return (await this.stripe.products.list()).data.find((productStripe) => productStripe.name === product.name).id;
  }
  async updateProduct(id: string, product: StripeProductDTO) {
    try {
      await this.getProducts();
      let idProduct = `prod_${id.toString()}`;
      let productObject = this._products.find((product: any) => product.id === idProduct);
      if(productObject !== undefined) {

        await this.stripe.products.update(productObject.id, {
          name: product.name,
        });
        await this.getProducts();
        return {status: 200, message: `Product updated successfully.`, data: this._products};
      }
    } catch (error) {
      console.error('Failed to fetch products from Stripe', error.stack);
      throw new Error('Unable to fetch products from Stripe');
    }

  }
  async deleteProduct(id: string) {
    try {
      await this.getProducts();

      this._products = this._products.filter((product: any) => product.id !== `prod_${id.toString()}`);
      await this.getProducts();

      return {status: 200, message: `Product deleted successfully.`, data: this._products};
    } catch (error) {
      console.error('Failed to fetch products from Stripe', error.stack);
      throw new Error('Unable to fetch products from Stripe');
    }
  }
  async tryProductAdding(product: StripeProductDTO) {
    try {
      await this.addProduct(product);

      return {
        status: 201,
        message: 'New product created successfully',
      };
    } catch (error) {
      console.error('Failed to fetch products from Stripe', error.stack);
      throw new Error('Unable to fetch products from Stripe');
    }
  }
  async catchProduct(error: Error) {
    console.error('Failed to fetch products from Stripe', error.stack);
    throw new Error('Unable to fetch products from Stripe');
  }
  async createProduct(product: StripeProductDTO) {
    try {
      await this.tryProductAdding(product);
      return this.getProducts();
    } catch (error) {
      await this.catchProduct(error);
    }
  }
}
