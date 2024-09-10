import {Injectable} from "@nestjs/common";
import Stripe from "stripe";
import { ApiConfig } from "../config/api";

@Injectable()
export abstract class AbstractStripeService {
  protected readonly stripe: Stripe;

  protected constructor() {
    this.stripe = new Stripe(process.env.STRIPE_API_KEY);
  }
  private async getExchangeRate() {
    try {
      const response = await fetch(ApiConfig.exchangeApi);
      const data = await response.json();
      return data.conversion_rates.USD;
    } catch (error) {
      console.error('Erreur lors de la récupération du taux de change:', error);
      return null;
    }
  }
  protected async convertEURtoUSD(amountInEUR: number) {
    const exchangeRate = await this.getExchangeRate();
    return exchangeRate !== null ? amountInEUR * exchangeRate : null;
  }
}