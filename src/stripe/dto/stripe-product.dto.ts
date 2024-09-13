export class StripeProductDTO {
  name: string;
  default_price_data: {
    "unit_amount": number;
    "currency": string;
  }
}