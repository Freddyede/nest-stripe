import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../services/products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService]
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should be greater than 0', async () => {
  //   await service.getProducts();
  //   expect(service.productsArray.length).toBeGreaterThan(0);
  // });
  // it('should be equal to 0', () => {
  //   expect(service.productsArray.length).toBe(0);
  // });
  //
  // it('should be greater than previous length', async () => {
  //   await service.getProducts();
  //   let previousLength = service.productsArray.length;
  //   let response = await service.createProduct({
  //     name: 'my product data 32',
  //     default_price_data: {
  //       unit_amount: 200,
  //       currency: 'usd'
  //     }
  //   });
  //   expect(response.length).toBeGreaterThan(previousLength);
  // });
  it('should be smaller than previous length', async () => {
    let idP = await service.getIdByName({ name: 'my product test' });
    const response = await service.deleteProduct(idP);
    expect(response.data.includes(await service.findProductByName('my product test'))).toBeTruthy();
  })
  // it('should be started by prod_', async () => {
  //   expect((await service.getIdByName({name: 'my product test'})).startsWith('prod_')).toBeTruthy()
  // });
});