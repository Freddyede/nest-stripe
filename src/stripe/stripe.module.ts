import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { PaymentLinkService } from "./payment-link.service";
import { ProductsService } from "./products.service";

@Module({
  providers: [StripeService, ConfigService, PaymentLinkService, ProductsService],
  controllers: [StripeController],
  exports: [StripeService, ConfigService, PaymentLinkService],
})
export class StripeModule {

  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [ConfigModule.forRoot()],
      providers: [
        StripeService
      ],
    };
  }
}
