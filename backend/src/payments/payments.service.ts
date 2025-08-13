/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { randomBytes } from 'crypto';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  private CHAPA_SECRET_KEY = 'CHASECK_TEST-GLWXkR9ua9TjudXy5O3JFjm7KzPXmHlF'; 
  private CHAPA_API_URL = 'https://api.chapa.co/v1';

async initializePayment(data: CreatePaymentDto) {
  const tx_ref = randomBytes(8).toString('hex'); // unique reference
  try {
    const response = await axios.post(
      `${this.CHAPA_API_URL}/transaction/initialize`,
      {
        amount: data.amount,
        currency: 'ETB',
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        tx_ref,
        // Removed callback_url to avoid instant redirect
        return_url: `http://localhost:4200/receipt?tx_ref=${tx_ref}`
      },
      {
        headers: {
          Authorization: `Bearer ${this.CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return { checkout_url: response.data.data.checkout_url };
  } catch (error) {
    throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
  }
}

 async verifyPayment(tx_ref: string) {
    try {
      const response = await axios.get(
        `${this.CHAPA_API_URL}/transaction/verify/${tx_ref}`,
        {
          headers: {
            Authorization: `Bearer ${this.CHAPA_SECRET_KEY}`,
          },
        }
      );

      if (!response || !response.data) {
        throw new HttpException('No response data from payment verification', HttpStatus.BAD_REQUEST);
      }

      if (!response.data.data) {
        throw new HttpException('Payment verification data missing', HttpStatus.BAD_REQUEST);
      }

      return response.data.data;  // safe to return now

    } catch (error) {
      if (error.response && error.response.data) {
        throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Payment verification failed', HttpStatus.BAD_REQUEST);
    }
  }
}
