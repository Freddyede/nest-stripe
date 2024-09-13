import { Test, TestingModule } from '@nestjs/testing';
import { ProductNameService } from '../../services/product-name.service';
import {IProduct} from '../../interfaces';

describe('ProductNameService', () => {
  let service: ProductNameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductNameService]
    }).compile();

    service = module.get<ProductNameService>(ProductNameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be return an exception', () => {
    service.runner({owner: 'Franck', located_at: 'Lyon', located_from: 'Paris'});
    expect(service.stripeProductName).toThrow(TypeError);
  });
  it('should be return an exception', () => {
    service.runner({owner: 'Franck', located_at: 'Lyon', price: 200});
    expect(service.stripeProductName).toThrow(TypeError);
  });
  it('should be return an exception', () => {
    service.runner({owner: 'Franck',  located_from: 'Paris', price: 200});
    expect(service.stripeProductName).toThrow(TypeError);
  });
  it('should be return an exception', () => {
    service.runner({owner: 'Franck',  price: 200});
    expect(service.stripeProductName).toThrow(TypeError);
  });
  it('should be return an exception', () => {
    service.runner({owner: 'Franck'});
    expect(service.stripeProductName).toThrow(TypeError);
  });
  it('should be return IProduct object', () => {
    service.runner({owner: 'Franck', located_at: 'Lyon', located_from: 'Paris', price: 200});
    let product: IProduct;
    expect(service.stripeProductName).toEqual(typeof product);
  });
  it('should be return good object for send it to stripe modules', () => {
    let obj = {owner: 'Franck', located_at: 'Lyon', located_from: 'Paris', price: 200};
    service.runner(obj);
    let product = service.stripeProductName;
    expect(product.name).toEqual(`${obj.owner}-${obj.located_at}_${obj.located_from}`);
    expect(product.default_price_data.unit_amount).toEqual(obj.price);
    expect(product.default_price_data.currency).toEqual(/usd/i);
  });
});