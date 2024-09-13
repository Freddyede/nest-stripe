import { Injectable } from '@nestjs/common';
import { IProduct, IProductDatabase, IProductNameService } from '../interfaces';

/**
 * This service does create new product name with object configuration
 * @author Dayem Mohammad<mohamad_dayem@yahoo.com>
 * @version 0.0.1
 */
@Injectable()
export class ProductNameService implements IProductNameService {

  initProduct(product: IProductDatabase): void {
    throw new Error('Method not implemented.');
  }
  get stripeProductName(): IProduct {
    throw new Error('Method not implemented.');
  }
  runner(): void {
    throw new Error('Method not implemented.');
  }
}