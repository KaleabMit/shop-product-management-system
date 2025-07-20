import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.interface';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  product!: Product;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getProductById(id).subscribe((product) => {
        this.product = product;
      });
    }
  }

  updateProduct() {
    if (!this.product.productname || !this.product.price) {
      this.message.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill out all required fields.',
        life: 2000,
      });
      return;
    }

    if (!this.product.id) {
      this.message.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product ID is missing.',
        life: 2000,
      });
      return;
    }

    this.apiService.updateProduct(this.product.id, this.product).subscribe(
      () => {
        this.message.add({
          severity: 'info',
          summary: 'Product Updated',
          detail: 'Product updated successfully.',
          life: 1500,
        });
        setTimeout(() => this.router.navigateByUrl('/'), 1000);
      },
      (err: HttpErrorResponse) => {
        this.message.add({
          severity: 'error',
          summary: 'Update Failed',
          detail: err.message,
          life: 1500,
        });
      }
    );
  }
}
