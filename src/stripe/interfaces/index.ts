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
}/**
 * Interface for stripe product
 */
export interface IProductUpdate {
  name: string;
  active: boolean;
}