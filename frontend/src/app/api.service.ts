
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models/product.interface';
import { Router } from '@angular/router';
import { Category } from './models/category.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private URL = "http://localhost:5000";

  constructor(private http: HttpClient,
    private router: Router
  ) { }
  createProduct(formData: any): Observable<Product> {
    return this.http.post<Product>(`${this.URL}/product`, formData, {
      withCredentials: true
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/product`);
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/category`);
  }

   getProductById(id:string|null):Observable<Product>{
      return this.http.get<Product>(`${this.URL}/product/${id}`);
    }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.URL}/product/${id}`, product, {
      withCredentials: true
    });
  }

  removeProduct(id: number): Observable<{ success: boolean, product: Product }> {
    return this.http.delete<{ success: boolean, product: Product }>(`${this.URL}/product/${id}`, {
      withCredentials: true
    });
  }

  uploadProductImage(id: string | number, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.URL}/product/${id}/upload`, formData, {
    withCredentials: true
  });
}

initializePayment(paymentData: any): Observable<any> {
  return this.http.post(`${this.URL}/payments/initialize`, paymentData);
}
verifyPayment(tx_ref: string): Observable<any> {
  return this.http.get<any>(`${this.URL}/payments/verify/${tx_ref}`);
}


}
