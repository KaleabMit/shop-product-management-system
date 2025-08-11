import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product.interface';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem, CartService } from '../cart.service';

@Component({
  selector: 'app-delivery',
  standalone: false,
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent implements OnInit, OnDestroy {
   selectedProduct: Product | null = null;
  showQuickView: boolean = false;

  products: Product[] = [];
  searchTerm: string = '';
  loading = true;

  selectedQuantities: { [productId: number]: number } = {};

  cart: CartItem[] = [];
  totalPrice: number = 0;

  private sub$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private message: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService  // <-- Inject CartService
  ) { }

  ngOnInit(): void {
    this.apiService.getAllProducts().pipe(takeUntil(this.sub$)).subscribe({
      next: (products) => {
        this.products = products.map(p => ({
          ...p,
          image: p.image || 'rms.jpg',
          discount: p.discount ?? Math.floor(Math.random() * 30) + 5,
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

    // Subscribe to cart and total from CartService
    this.cartService.cartItems$.pipe(takeUntil(this.sub$)).subscribe(cart => {
      this.cart = cart;
    });

    this.cartService.totalPrice$.pipe(takeUntil(this.sub$)).subscribe(total => {
      this.totalPrice = total;
    });
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

    // Use CartService to add item
    this.cartService.addToCart({
      id: product.id!,
      name: product.productname,
      quantity,
      total: productTotal
    });

    this.selectedQuantities[product.id!] = 0;

    this.message.add({
      severity: 'success',
      summary: 'Added',
      detail: `${product.productname} added to cart.`,
      life: 1500,
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.message.add({
      severity: 'info',
      summary: 'Cart Cleared',
      detail: 'All products removed from cart.',
      life: 2000
    });
  }

  undoLast(): void {
    this.cartService.undoLast();
    this.message.add({
      severity: 'warn',
      summary: 'Undo',
      detail: `Last item removed from cart.`,
      life: 2000
    });
  }

  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete();
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

  getImageUrl(product: Product): string {
    if (product.image && product.image.startsWith('http')) {
      return product.image;
    }
    return 'https://res.cloudinary.com/duinnjdn6/image/upload/v1754530586/KMB_wkfjig.jpg';
  }

  openQuickView(product: Product): void {
    this.selectedProduct = product;
    this.showQuickView = true;
  }

  closeQuickView(): void {
    this.selectedProduct = null;
    this.showQuickView = false;
  }
  
}
