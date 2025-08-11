import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartItem, CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
amount = 0;  // initialize as 0
  email = '';
  address = '';
  first_name = '';
  last_name = '';

  cart: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private apiService: ApiService, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cart = items;
    });

    this.cartService.totalPrice$.subscribe(price => {
      this.totalPrice = price;
      this.amount = price;  // update amount when totalPrice changes
    });
  }

  clearCart() {
    this.cartService.clearCart();
  }

  undoLast() {
    this.cartService.undoLast();
  }

payNow() {
  if (!this.amount || this.amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  this.apiService.initializePayment({
    amount: this.amount,
    email: this.email,
    address: this.address,
    first_name: this.first_name,
    last_name: this.last_name,
    // Note: items are not sent to backend here unless you want to extend backend
  }).subscribe({
    next: (res) => {
      const url = res.checkout_url;
      if (url) {
        // Save cart to sessionStorage for receipt page use
        sessionStorage.setItem('paymentItems', JSON.stringify(this.cart));
        window.location.href = url;
      } else {
        alert('Payment initiation failed. Try again.');
        console.error('No checkout_url in response', res);
      }
    },
    error: (err) => {
      alert('Payment initialization error. Check console.');
      console.error(err);
    }
  });
}


}
