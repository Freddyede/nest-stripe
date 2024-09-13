import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/modules/stripe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { UserEntity } from './stripe/entity/user.entity';
import { JourneysEntity } from './stripe/entity/journeys.entity';
import { CityEntity } from './stripe/entity/city.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([JourneysEntity]),
    TypeOrmModule.forFeature([CityEntity]),
    StripeModule,
  ],
  exports: [TypeOrmModule.forFeature([JourneysEntity]), StripeModule],
})
export class AppModule {}
