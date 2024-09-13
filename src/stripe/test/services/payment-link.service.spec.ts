import { Test, TestingModule } from '@nestjs/testing';
import { PaymentLinkService } from '../../services/payment-link.service';
import { ProductsService } from '../../services/products.service';

describe('PaymentLinkService', () => {
  let service: PaymentLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PaymentLinkService]
    }).compile();

    service = module.get<PaymentLinkService>(PaymentLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});