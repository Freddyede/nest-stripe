import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/modules/stripe.module';
import { CalculatriceService } from './calculatrice/calculatrice.service';

@Module({
  imports: [StripeModule],
  providers: [CalculatriceService]
})
export class AppModule {}
