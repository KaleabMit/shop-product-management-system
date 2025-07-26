import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product.interface';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delivery',
  standalone: false,
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  searchTerm: string = '';
  loading = true;

  selectedQuantities: { [productId: number]: number } = {};
  totalPrice: number = 0;

  cart: { id: number, name: string, quantity: number, total: number }[] = [];

  private sub$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private message: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.apiService.getAllProducts().pipe(takeUntil(this.sub$)).subscribe({
    next: (products) => {
      this.products = products.map(p => ({
        ...p,
        // image: p.image || `https://source.unsplash.com/300x200/?product,tech,${p.id}`,
        image: p.image || 'rms.jpg',
        discount: p.discount ?? Math.floor(Math.random() * 30) + 5,
        rating: p.rating ?? Math.floor(Math.random() * 5) + 1
      }));
      this.loading = false;
    },
    error: () => {
      this.loading = false;
      this.message.add({
        severity: 'error',
        summary: 'Load Error',
        detail: 'Failed to load products',
        life: 3000,
      });
    },
  });
}


  getDelay(product: Product): number {
    const index = this.products.indexOf(product);
    return 100 + (index % 4) * 100;
  }

  filteredProducts(): Product[] {
    if (!this.searchTerm.trim()) return this.products;
    const term = this.searchTerm.toLowerCase();
    return this.products.filter(p => p.productname.toLowerCase().includes(term));
  }

  addToCart(product: Product): void {
    const quantity = this.selectedQuantities[product.id!];

    if (!quantity || quantity <= 0) {
      this.message.add({
        severity: 'warn',
        summary: 'Invalid Quantity',
        detail: 'Please enter a valid quantity (e.g., 1, 0.5, 0.25)',
        life: 2000,
      });
      return;
    }

    const productTotal = quantity * product.price;

    this.cart.push({
      id: product.id!,
      name: product.productname,
      quantity: quantity,
      total: productTotal
    });

    this.totalPrice += productTotal;
    this.selectedQuantities[product.id!] = 0;
  }

  clearCart(): void {
    this.cart = [];
    this.totalPrice = 0;
    this.message.add({
      severity: 'info',
      summary: 'Cart Cleared',
      detail: 'All products removed from cart.',
      life: 2000
    });
  }

  undoLast(): void {
    const last = this.cart.pop();
    if (last) {
      this.totalPrice -= last.total;
      this.message.add({
        severity: 'warn',
        summary: 'Undo',
        detail: `${last.name} removed from cart.`,
        life: 2000
      });
    }
  }

  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete();
  }
}
