import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentLinkService } from '../services/payment-link.service';
import { StripePaymentLinkDTO } from '../dto/stripePaymentLink.dto';

@Controller('stripe/linkPayments')
export class StripePaymentLinkController {
  constructor(private readonly paymentLinkService: PaymentLinkService) {}
  @Get()
  async findAll() {
    return this.paymentLinkService.getPaymentLinkedLists();
  }
  @Post('addLinkPayment')
  async addNewLinkPayment(@Body() paymentLink: StripePaymentLinkDTO) {
    return this.paymentLinkService.addProductToPaymentLink(paymentLink);
  }
}