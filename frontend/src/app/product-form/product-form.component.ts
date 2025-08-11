import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Product } from '../models/product.interface';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  selectedFiles: { [id: number]: File } = {};
  products: Product[] = [];

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.apiService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onSubmit(productForm: NgForm) {
    if (productForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Incomplete Submission',
        detail: 'Please fill all fields.',
      });
      return;
    }

    const { productname, description, price, discount } = productForm.value;
    const payload = { productname, description, price, discount };

    this.apiService.createProduct(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Product Added',
          detail: 'Your product has been successfully added.',
        });
        productForm.resetForm();
        this.loadProducts(); // Refresh list
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add product. Try again.',
        });
      },
    });
  }

  onFileSelected(event: any, productId: number) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFiles[productId] = file;
    }
  }

  uploadImage(productId: number) {
    const file = this.selectedFiles[productId];
    if (!file) {
      alert('No file selected');
      return;
    }

    this.apiService.uploadProductImage(productId, file).subscribe({
      next: (response) => {
        alert('Upload successful!');
        const uploadedImageUrl = response.imageUrl;
        const product = this.products.find((p) => p.id === productId);
        if (product) {
          product.image = uploadedImageUrl;
        }
      },
      error: (err) => {
        console.error(err);
        alert('Upload failed');
      },
    });
  }

  getImageUrl(product: Product): string {
    return product.image || 'https://via.placeholder.com/200';
  }
}
