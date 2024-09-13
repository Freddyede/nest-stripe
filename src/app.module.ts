import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/modules/stripe.module';

@Module({
  imports: [StripeModule]
})
export class AppModule {}
