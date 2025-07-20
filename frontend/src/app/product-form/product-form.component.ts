import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
 constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmit(productForm: NgForm) {
    
     if (productForm.invalid ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Incomplete Submission',
        detail: 'Please fill all fields.',
      });
      return;
    }

    const {productname, price } = productForm.value;
    const payload = {productname,price};
    this.apiService.createProduct(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Product Added',
          detail: 'Your product has been successfully added.',
        });
        productForm.resetForm();
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
}
