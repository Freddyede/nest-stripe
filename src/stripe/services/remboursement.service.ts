import { Injectable } from '@nestjs/common';
import { AbstractStripeService } from '../abstract/abstractStripe.service';
import { IRefundType } from '../interfaces';
import { Stripe } from 'stripe';

/**
 * @class RemboursementService : Contains all method for the refunds client with stripe
 * @version 0.0.1
 * @author Patouillard Franck<patouillardfranck3@gmail.com>
 * @author Dayem Mohamad <mohamad_dayem@yahoo.com>
 * @file src/stripe/microServices/remboursement.service.ts
 */
@Injectable()
export class RemboursementService extends AbstractStripeService {
  constructor() {
    super();
  }

  /**
   * Init new refunds
   * @version 0.0.1
   * @Author Patouillard Franck<patouillardfranck3@gmail.com>
   * @Author Dayem Mohamad <mohamad_dayem@yahoo.com>
   */
  async initRefund(refundObject: IRefundType) {
    return this.createRefund(refundObject);
  }

  /**
   * Create new refund for client and verify refundObject
   * @version 0.0.1
   * @Author Patouillard Franck<patouillardfranck3@gmail.com>
   * @Author Dayem Mohamad <mohamad_dayem@yahoo.com>
   */
  async verifyRefundObject(refundObject: IRefundType) {
    if(refundObject.charge.startsWith('ch_')) {
      await this.stripe.refunds.create({
        ...refundObject,
        reverse_transfer: true,
      });
      return {status: 201, message: 'Refund create successfully'};
    } else if(!refundObject.charge.startsWith('ch_')) {
      return {status: 500, message: 'Field paymentIntent does start with pi_', data: refundObject.charge};
    } else {
      return {status: 500, message: 'Missing fields', data: refundObject };
    }
  }

  /**
   * Catche stripe error and start verifyRefundObject
   * @version 0.0.1
   * @Author Patouillard Franck<patouillardfranck3@gmail.com>
   * @Author Dayem Mohamad <mohamad_dayem@yahoo.com>
   */
  async createRefund(refundObject: IRefundType) {
    try {
      await this.verifyRefundObject(refundObject);
    } catch (error) {
      console.error(error.stack);
      throw new Error('Refund can\'t create : ' + error.stack.toString());
    }
  }

  async getRefunds(): Promise<Stripe.Refund[]> {
    try {
      const refunds = await this.stripe.refunds.list();
      return refunds.data;
    } catch (error) {
      console.error(error.stack);
      throw new Error('Refunds not found : ' + error.stack.toString());
    }
  }
}