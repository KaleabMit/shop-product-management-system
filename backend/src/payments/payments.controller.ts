import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
 
  @Post('initialize')
  async initializePayment(@Body() body: any) {
    return this.paymentsService.initializePayment(body);
  }

  @Get('verify/:tx_ref')
  async verifyPayment(@Param('tx_ref') tx_ref: string) {
    return this.paymentsService.verifyPayment(tx_ref); // returns JSON, no redirect
  }
}
