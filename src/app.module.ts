import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/modules/stripe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      synchronize: true,
      autoLoadEntities: true,
    }),
    StripeModule,
  ],
})
export class AppModule {}
