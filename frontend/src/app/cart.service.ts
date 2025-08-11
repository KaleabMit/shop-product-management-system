import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private totalPriceSubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();
  totalPrice$ = this.totalPriceSubject.asObservable();

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  get totalPrice(): number {
    return this.totalPriceSubject.value;
  }

  addToCart(item: CartItem) {
    const cart = [...this.cartItemsSubject.value, item];
    this.cartItemsSubject.next(cart);
    this.calculateTotal(cart);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    this.totalPriceSubject.next(0);
  }

  undoLast() {
    const cart = [...this.cartItemsSubject.value];
    cart.pop();
    this.cartItemsSubject.next(cart);
    this.calculateTotal(cart);
  }

  private calculateTotal(cart: CartItem[]) {
    const total = cart.reduce((sum, item) => sum + item.total, 0);
    this.totalPriceSubject.next(total);
  }
}
