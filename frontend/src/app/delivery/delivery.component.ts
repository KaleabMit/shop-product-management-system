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
  private sub$ = new Subject<void>();
  searchTerm: string = '';
  loading = true;

  constructor(
    private apiService: ApiService,
    private message: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.getAllProducts().pipe(takeUntil(this.sub$)).subscribe({
      next: (products) => {
        this.products = products;
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

  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete();
  }

  removeProduct(id: number) {
    if (id == null) return; // Guard against undefined

    const post = this.products.find((product) => product.id === id);

    if (!post) {
      this.message.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Product does not exist.',
        life: 2000,
      });
      return;
    }

    this.apiService.removeProduct(id).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.products = this.products.filter((p) => p.id !== id);
          this.message.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Product removed successfully.',
            life: 1500,
          });
        } else {
          this.message.add({
            severity: 'warn',
            summary: 'Delete Failed',
            detail: 'Invalid server response.',
            life: 2000,
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.message.add({
          severity: 'error',
          summary: `Error ${err.status}`,
          detail: err.statusText || 'Failed to remove product.',
          life: 2000,
        });
      },
    });
  }

  filteredProducts(): Product[] {
    if (!this.searchTerm.trim()) return this.products;
    const term = this.searchTerm.toLowerCase();
    return this.products.filter(p => p.productname.toLowerCase().includes(term));
  }
}
