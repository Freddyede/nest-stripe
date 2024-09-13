import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { StripeProductController } from '../controllers/stripe-product.controller';
import { PaymentLinkService } from "../services/payment-link.service";
import { ProductsService } from "../services/products.service";
import { RemboursementService } from '../services/remboursement.service';
import { StripePaymentLinkController } from '../controllers/stripe-paymentLink.controller';

@Module({
  providers: [ConfigService, PaymentLinkService, ProductsService, RemboursementService],
  controllers: [StripeProductController, StripePaymentLinkController],
  exports: [ConfigService, PaymentLinkService, ProductsService, RemboursementService],
})
export class StripeModule {

  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeProductController],
      imports: [
        ConfigModule.forRoot(),
      ],
      providers: [
        ProductsService,
        PaymentLinkService
      ],
      exports: [
        ProductsService,
        PaymentLinkService
      ]
    };
  }
}
