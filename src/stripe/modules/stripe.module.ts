import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { StripeProductController } from '../controllers/stripe-product.controller';
import { PaymentLinkService } from "../services/payment-link.service";
import { ProductsService } from "../services/products.service";
import { RemboursementService } from '../services/remboursement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JourneysEntity } from '../entity/journeys.entity';
import JourneysRepository from '../repository/journeys.repository';
import { StripePaymentLinkController } from '../controllers/stripe-paymentLink.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([JourneysEntity]),
  ],
  providers: [ConfigService, PaymentLinkService, ProductsService, RemboursementService, JourneysRepository],
  controllers: [StripeProductController, StripePaymentLinkController],
  exports: [ConfigService, PaymentLinkService, ProductsService, RemboursementService, JourneysRepository],
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
