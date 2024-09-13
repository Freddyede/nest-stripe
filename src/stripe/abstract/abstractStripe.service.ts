import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ApiConfig } from '../../config/api';

@Injectable()
export abstract class AbstractStripeService {
  protected readonly stripe: Stripe;

  protected constructor() {
    this.stripe = new Stripe(process.env.STRIPE_API_KEY);
  }
  private async getExchangeRate(amountInEuro: number) {
    try {
      const response = await fetch(ApiConfig.exchangeApi);
      const data = await response.json();

      if (response.ok) {
        const usdRate = data.conversion_rates.USD;
        return amountInEuro * usdRate;
      } else {
        console.error(
          'Erreur lors de la récupération des taux de change:',
          data.error,
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête à l'API:", error);
    }
  }
  protected async convertEURtoUSD(amountInEUR: number) {
    const exchangeRate = await this.getExchangeRate(amountInEUR);
    return exchangeRate !== null
      ? (amountInEUR * exchangeRate).toString()
      : null;
  }
}