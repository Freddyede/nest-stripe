// Class Interfaces

/**
 * # Warning: Please don't touch it !
 * ### Interface for ProductNameService
 * @version 0.0.1
 * @author Patouillard Franck<patouillardfranck3@gmail.com>
 */
export interface IProductNameService {
  initProduct(product: IProductDatabase): void;
  get stripeProductName(): IProduct;
  runner(): void;

}

// Object Interfaces

/**
 * Interface for database product
 * @version 0.0.1
*/
export interface IProductDatabase {
  owner: string;
  located_at: string;
  located_from: string;
  price: number;
}

/**
 * Interface for stripe charge
 * @version 0.0.1
 */
export interface ICharges {
  amount: number;
  currency: string;
}

/**
 * Interface for stripe refund
 */
export interface IRefundType {
  charge: string;
}


/**
 * Interface for stripe product
 */
export interface IProduct {
  name: string;
  default_price_data: {
    unit_amount: any;
    currency: string;
  }
}

/**
 * Interface for stripe product
 */
export interface IProductUpdate {
  name: string;
  active: boolean;
}